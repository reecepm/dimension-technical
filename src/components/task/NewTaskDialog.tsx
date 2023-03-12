import { Dialog, Button } from "@/components/ui";
import EnterIcon from "@/icons/Enter";
import EditorMenu from "@/components/editor/EditorMenu";
import debounce from "lodash.debounce";

import { EditorContent, useEditor } from "@tiptap/react";
import { config } from "../editor/config";
import EditorSelect, { EditorTriggerButton, ValueType } from "../editor/Select";
import {
  FieldValues,
  FormProvider,
  useFieldArray,
  useForm,
} from "react-hook-form";
import {
  AiIcon,
  CloudIcon,
  DueIcon,
  PriorityIcon,
  ProjectIcon,
  TagIcon,
  TodoIcon,
  UserIcon,
} from "@/icons/editor";
import { api } from "@/utils/api";
import { Priority } from "@prisma/client";
import TurndownService from "turndown";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useCallback, useContext, useMemo, useRef, useState } from "react";
import React from "react";
import { twMerge } from "tailwind-merge";
import TaskRecommendations from "./TaskRecommendations";

const valueTypeSchema = z.object({
  label: z.string(),
  value: z.string(),
  color: z.string().optional(),
});

const newTaskSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().optional(),
  project: valueTypeSchema.optional(),
  status: valueTypeSchema.optional(),
  assignees: valueTypeSchema.array().optional(),
  priority: z
    .object({
      label: z.string(),
      value: z.nativeEnum(Priority),
    })
    .optional(),
  tags: valueTypeSchema.array().optional(),
  dueDate: z.date().optional(),
});

interface Props {
  team: {
    name: string;
    icon: React.ReactNode;
  };
}

export interface NewTaskFormValues {
  title: string;
  description: string;
  descPlainText: string;
  tags: ValueType[];
  project: ValueType;
  priority: ValueType;
  status: ValueType;
  assignees: ValueType[];
}

const NewTaskDialog: React.FC<Props> = ({ team }) => {
  const [open, setOpen] = useState(false);

  const methods = useForm<NewTaskFormValues>({
    resolver: zodResolver(newTaskSchema),
  });

  const {
    control,
    watch,
    setValue,
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = methods; // destructuring separately to be able to pass methods

  const {
    fields: tagFields,
    append: appendTag,
    remove: removeTag,
  } = useFieldArray({
    control,
    name: "tags",
  });
  const {
    fields: assigneeFields,
    append: appendAssignee,
    remove: removeAssignee,
  } = useFieldArray({
    control,
    name: "assignees",
  });

  const editor = useEditor({
    ...config,
    onUpdate: ({ editor, transaction }) => {
      if (transaction.docChanged) {
        var turndownService = new TurndownService();
        var markdown = turndownService.turndown(editor.getHTML());
        setValue("description", markdown);
        setValue("descPlainText", editor.getText());
        callback();
      }
    },
  });

  const {
    data: aiData,
    isLoading: aiLoading,
    isError: aiError,
    reset: resetAI,
    mutate: getAI,
  } = api.tasks.getRelevantTagAndProjects.useMutation();

  const aiChangeHandler = () => {
    if (!watch("title")) return;
    getAI({
      title: watch("title"),
      description: watch("descPlainText") ?? "",
    });
  };
  const callback = useMemo(() => debounce(aiChangeHandler, 1500), []);

  const { mutateAsync: createTask } = api.tasks.create.useMutation();

  const [statuses, projects, users, tags] = api.useQueries((t) => [
    t.statuses.getAll(undefined, {
      select: (d) =>
        d.map((x) => ({ label: x.name, value: x.id, color: x.color })),
    }),
    t.projects.getAll(undefined, {
      select: (d) =>
        d.map((x) => ({
          label: x.name,
          value: x.id,
          color: x.color,
          Icon: CloudIcon,
        })),
    }),
    t.users.getAll(undefined, {
      select: (d) => d.map((x) => ({ label: x.name, value: x.id })),
    }),
    t.tags.getAll(undefined, {
      select: (d) =>
        d.map((x) => ({ label: x.name, value: x.id, color: x.color })),
    }),
  ]);

  const onSubmit = handleSubmit((data) => {
    toast.promise(
      createTask(
        {
          title: data.title,
          description: data.description,
          projectId: data.project?.value,
          statusId: data.status?.value,
          assignees: data.assignees?.map((x) => x.value),
          priority: data.priority?.value as Priority,
          tags: data.tags?.map((x) => x.value),
        },
        {
          onSuccess: () => {
            reset();
            editor?.commands.setContent("");
            setOpen(false);
          },
        }
      ),
      {
        loading: "Creating task...",
        success: "Task created",
        error: "Failed to create task",
      }
    );
  });

  const { onChange: onTitleChange, ...rest } = register("title");

  const submitButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <Dialog
      modal={false}
      onOpenChange={(o) => {
        if (o) {
          reset();
          resetAI();
          editor?.commands.clearContent(false);
        }
        setOpen(o);
      }}
      open={open}
    >
      <Dialog.Trigger asChild>
        <Button onClick={() => setOpen(true)}>New Task</Button>
      </Dialog.Trigger>
      <Dialog.Content
        onFocus={(e) => {
          if (e.target === e.currentTarget) submitButtonRef.current?.focus();
        }}
      >
        <FormProvider {...methods}>
          <form className="grid gap-4" onSubmit={onSubmit}>
            <Dialog.Header
              tag={
                <div className="flex items-center gap-2 self-start rounded-md bg-shade-100/50 px-3 py-1.5">
                  {team.icon}
                  {team.name}
                </div>
              }
              action="New Task"
            />
            <Dialog.Description>
              <input
                placeholder="Task title"
                className="border-none text-base font-medium outline-none placeholder:text-shade-300"
                autoFocus
                onChange={(e) => {
                  onTitleChange(e);
                  callback();
                }}
                {...rest}
              />
              {errors.title && (
                <p className="text-xs text-red-500">{errors.title.message}</p>
              )}
              <EditorContent
                editor={editor}
                className="relative mt-0.5 mb-3 min-w-0 text-sm"
              />
              <div className="flex flex-col gap-3">
                <TaskRecommendations
                  {...{
                    aiData,
                    aiLoading,
                    aiError,
                    tagFieldArray: {
                      fields: tagFields,
                      append: appendTag,
                    },
                  }}
                  tags={tags.data ?? []}
                  projects={projects.data ?? []}
                />
                <div className="flex flex-wrap items-end gap-2">
                  <EditorSelect
                    Icon={TodoIcon}
                    placeholder="Todo"
                    options={statuses.data ?? []}
                    value={watch("status")}
                    onChange={(v) => setValue("status", v)}
                    optionsLoading={statuses.isLoading}
                  />
                  <EditorSelect
                    Icon={UserIcon}
                    placeholder="Assignee"
                    options={users.data ?? []}
                    value={watch("assignees")}
                    onChange={(v) => {
                      if (assigneeFields.some((x) => x.value === v.value)) {
                        removeAssignee(
                          assigneeFields.findIndex((x) => x.value === v.value)
                        );
                      } else {
                        appendAssignee(v);
                      }
                    }}
                    optionsLoading={users.isLoading}
                  />
                  <EditorSelect
                    Icon={PriorityIcon}
                    placeholder="Priority"
                    options={[
                      {
                        label: "None",
                        value: Priority.NONE,
                      },
                      { label: "Low", value: Priority.LOW },
                      { label: "Medium", value: Priority.MEDIUM },
                      { label: "High", value: Priority.HIGH },
                      {
                        label: "Urgent",
                        value: Priority.URGENT,
                      },
                    ]}
                    onChange={(v) => setValue("priority", v)}
                    value={watch("priority")}
                  />
                  <EditorSelect
                    Icon={TagIcon}
                    placeholder="Tags"
                    options={tags.data ?? []}
                    value={watch("tags")}
                    onChange={(v) => {
                      if (tagFields.some((x) => x.value === v.value)) {
                        removeTag(
                          tagFields.findIndex((x) => x.value === v.value)
                        );
                      } else {
                        appendTag(v);
                      }
                    }}
                    optionsLoading={tags.isLoading}
                  />
                  <EditorSelect
                    Icon={ProjectIcon}
                    placeholder="Project"
                    options={projects.data ?? []}
                    value={watch("project")}
                    onChange={(v) => setValue("project", v)}
                    optionsLoading={projects.isLoading}
                  />
                  <EditorTriggerButton>
                    <DueIcon className="h-4 w-4" />
                    Due Date
                  </EditorTriggerButton>
                </div>
              </div>
            </Dialog.Description>
            <Dialog.Footer>
              {editor && <EditorMenu editor={editor} />}
              <Button
                ref={submitButtonRef}
                shortcut={{
                  label: <EnterIcon className="h-4 w-4" />,
                  key: "Enter",
                }}
                disabled={isSubmitting || !isValid}
                type="submit"
              >
                Create
              </Button>
            </Dialog.Footer>
          </form>
        </FormProvider>
      </Dialog.Content>
    </Dialog>
  );
};

export default NewTaskDialog;
