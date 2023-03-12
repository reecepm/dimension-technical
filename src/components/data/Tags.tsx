import { TrashIcon } from "@/icons/editor";
import { api } from "@/utils/api";
import * as Popover from "@radix-ui/react-popover";
import React from "react";
import { twMerge } from "tailwind-merge";
import { Button } from "../ui";
import TwColorPicker from "./TwColorPicker";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

const Tags = () => {
  const { data: tags, isLoading, isError } = api.tags.getAll.useQuery();
  const utils = api.useContext();
  const { mutateAsync: removeTag } = api.tags.remove.useMutation({
    onMutate: async ({ id }) => {
      utils.tags.getAll.setData(undefined, (prev) => {
        if (!prev) return prev;
        return prev.filter((tag) => tag.id !== id);
      });
    },
    onError: () => {
      utils.tags.getAll.reset();
    },
  });

  return (
    <div className="flex flex-col gap-3">
      <div className="flex w-full items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900">tags</h3>
        <AddTag />
      </div>
      {isError && <p>Failed loading tags</p>}
      {isLoading && <p>Loading tags...</p>}
      {tags && (
        <div className="-mr-3 flex max-h-80 flex-col gap-1 overflow-auto pr-3 text-shade-300">
          {tags.length === 0 && <p>No tags</p>}
          {tags?.map((tag) => (
            <div key={tag.id} className="flex w-full items-center gap-2">
              <div
                className={twMerge(
                  "h-4 w-4 rounded-full bg-current",
                  tag.color
                )}
              />
              <p>{tag.name}</p>

              <button
                className="ml-auto"
                onClick={() => {
                  toast.promise(
                    removeTag(
                      {
                        id: tag.id,
                      },
                      {
                        onSuccess: () => {},
                      }
                    ),
                    {
                      success: "Removed tag",
                      error: "Failed removing tag",
                      loading: "Removing tag...",
                    }
                  );
                }}
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tags;

interface AddTagForm {
  name: string;
  color: string;
}

const createSchema = z.object({
  name: z.string({
    required_error: "Name is required",
  }),
  color: z.string().regex(/^text-[a-z]{3,8}-[0-9]{3}$/),
});

const AddTag = () => {
  const utils = api.useContext();
  const { mutateAsync: createTag, isLoading } = api.tags.create.useMutation();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm<AddTagForm>({
    resolver: zodResolver(createSchema),
    defaultValues: {
      name: "",
      color: "text-red-500",
    },
  });

  const onSubmit = handleSubmit((data) =>
    toast.promise(
      createTag(data, {
        onSuccess: () => {
          utils.tags.getAll.invalidate();
          reset();
        },
      }),
      {
        success: "Created tag",
        error: "Failed creating tag",
        loading: "Creating tag...",
      }
    )
  );

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button>Add</Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          sideOffset={8}
          side="top"
          className="z-50 w-60 rounded-md border border-slate-100 bg-white p-4 shadow-dialog outline-none animate-in data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2 data-[side=right]:slide-in-from-left-2 data-[side=left]:slide-in-from-right-2"
        >
          <form
            onSubmit={onSubmit}
            className="flex flex-col items-center gap-3"
          >
            <input
              {...register("name")}
              className="rounded border border-lightBorder py-1.5 px-3 font-medium outline-none placeholder:placeholder-shade-300"
              placeholder="Tag name"
            />
            {errors.name?.message && (
              <p className="text-xs text-red-700">{errors.name?.message}</p>
            )}
            <TwColorPicker
              value={watch("color")}
              onChange={(c) => setValue("color", c)}
            />
            {errors.color?.message && (
              <p className="text-xs text-red-700">{errors.color?.message}</p>
            )}
            <Button
              className="self-end"
              disabled={!isValid || isLoading}
              type="submit"
            >
              Add
            </Button>
          </form>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};
