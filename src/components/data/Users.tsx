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

const Users = () => {
  const { data: users, isLoading, isError } = api.users.getAll.useQuery();
  const utils = api.useContext();
  const { mutateAsync: removeUser } = api.users.remove.useMutation({
    onMutate: async ({ id }) => {
      utils.users.getAll.setData(undefined, (prev) => {
        if (!prev) return prev;
        return prev.filter((user) => user.id !== id);
      });
    },
    onError: () => {
      utils.users.getAll.reset();
    },
  });

  return (
    <div className="flex flex-col gap-3">
      <div className="flex w-full items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900">users</h3>
        <AddUser />
      </div>
      {isError && <p>Failed loading users</p>}
      {isLoading && <p>Loading users...</p>}
      {users && (
        <div className="-mr-3 flex max-h-80 flex-col gap-1 overflow-auto pr-3 text-shade-300">
          {users.length === 0 && <p>No users</p>}
          {users?.map((user) => (
            <div key={user.id} className="flex w-full items-center gap-2">
              <p>{user.name}</p>

              <button
                className="ml-auto"
                onClick={() => {
                  toast.promise(
                    removeUser(
                      {
                        id: user.id,
                      },
                      {
                        onSuccess: () => {},
                      }
                    ),
                    {
                      success: "Removed user",
                      error: "Failed removing user",
                      loading: "Removing user...",
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

export default Users;

interface AddUserForm {
  name: string;
}

const createSchema = z.object({
  name: z.string({
    required_error: "Name is required",
  }),
});

const AddUser = () => {
  const utils = api.useContext();
  const { mutateAsync: createUser, isLoading } = api.users.create.useMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<AddUserForm>({
    resolver: zodResolver(createSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = handleSubmit((data) =>
    toast.promise(
      createUser(data, {
        onSuccess: () => {
          utils.users.getAll.invalidate();
          reset();
        },
      }),
      {
        success: "Created user",
        error: "Failed creating user",
        loading: "Creating user...",
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
              placeholder="Name"
              autoComplete="off"
              type="text"
            />
            {errors.name?.message && (
              <p className="text-xs text-red-700">{errors.name?.message}</p>
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
