import { AiIcon, ProjectIcon } from "@/icons/editor";
import { api } from "@/utils/api";
import React, { useMemo } from "react";
import {
  FieldArrayWithId,
  useFieldArray,
  UseFieldArrayAppend,
  useFormContext,
} from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { ValueType } from "../editor/Select";
import { NewTaskFormValues } from "./NewTaskDialog";

interface Props {
  tags: ValueType[];
  projects: ValueType[];
  aiData:
    | {
        tags: string[];
        projects: string[];
      }
    | undefined;
  aiLoading: boolean;
  aiError: boolean;
  tagFieldArray: {
    fields: FieldArrayWithId<NewTaskFormValues, "tags">[];
    append: UseFieldArrayAppend<NewTaskFormValues, "tags">;
  };
}

const TaskRecommendations: React.FC<Props> = ({
  tags,
  projects,
  aiData,
  aiLoading,
  aiError,
  tagFieldArray: { fields: tagFields, append: appendTag },
}) => {
  const { setValue, watch } = useFormContext<NewTaskFormValues>();

  const aiTags = useMemo(() => {
    if (!aiData || !tags) return [];
    return tags.filter(
      (x) =>
        aiData.tags.includes(x.value) &&
        !tagFields.some((y) => y.value === x.value)
    );
  }, [aiData, tags, tagFields]);

  const aiProjects = useMemo(() => {
    if (!aiData || !projects) return [];
    return projects.filter(
      (x) =>
        aiData.projects.includes(x.value) && x.value !== watch("project")?.value
    );
  }, [aiData, projects, watch("project")]);

  return aiLoading || aiData ? (
    <div
      className={twMerge(
        "flex h-[30px] flex-wrap items-center gap-2.5",
        aiData || aiLoading
          ? "animate-in fade-in zoom-in-[0.97] duration-200"
          : "animate-out fade-out zoom-out-[0.97] duration-200"
      )}
    >
      <AiIcon
        className={twMerge(
          "h-5 w-5 text-shade-300",
          aiLoading && "animate-pulse"
        )}
      />
      {aiLoading && (
        <div className="mx-1 animate-pulse text-sm text-shade-300">
          Generating recommendations...
        </div>
      )}
      {aiProjects.map((x) => {
        const FinalIcon = x.Icon || ProjectIcon;
        return (
          <AiRecommendation
            key={`ai-${x.value}`}
            onClick={() => setValue("project", x)}
          >
            <FinalIcon className={twMerge("h-4 w-4 flex-shrink-0", x.color)} />
            {x.label}
          </AiRecommendation>
        );
      })}
      {aiTags.map((x) => (
        <AiRecommendation key={`ai-${x.value}`} onClick={() => appendTag(x)}>
          <div
            className={twMerge(
              "h-3 w-3 flex-shrink-0 rounded-full bg-current p-1",
              x.color
            )}
          ></div>
          {x.label}
        </AiRecommendation>
      ))}
      {aiData && aiTags.length === 0 && aiProjects.length === 0 && (
        <div className="mx-1 text-sm text-shade-300 animate-in fade-in zoom-in-[0.97] slide-in-from-left-1 duration-200">
          No recommendations found
        </div>
      )}
      {aiError && (
        <div className="mx-1 text-sm text-shade-300 animate-in fade-in zoom-in-[0.97] slide-in-from-left-1 duration-200">
          Failed to generate recommendations
        </div>
      )}
    </div>
  ) : null;
};

export default TaskRecommendations;

export const AiRecommendation = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    type="button"
    className={twMerge(
      "flex items-center gap-2 rounded-lg border border-dashed border-shade-200 px-3 py-1.5 text-xs text-shade-300 transition-colors hover:bg-black/5 hover:text-shade-400 focus:border-shade-300 focus:outline-none focus:ring-0",
      "animate-in fade-in zoom-in-[0.97] slide-in-from-left-1 duration-200",
      className
    )}
    ref={ref}
    {...props}
  />
));

AiRecommendation.displayName = "IconButton";
