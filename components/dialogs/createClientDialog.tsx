import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateClient } from "@/hooks/clients/useCreateClient";
import { useState } from "react";

type CreateClientProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSuccess: () => void;
};

export function CreateClientDialog({ open, setOpen, onSuccess }: CreateClientProps) {
  const { handleCreateClient, loading } =
    useCreateClient(onSuccess);

  const [data, setData] = useState({
    name: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    handleCreateClient(data);
    setOpen(false)
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>New client</DialogTitle>
            <DialogDescription>
              Create a client to connect and manage ad accounts from multiple
              platforms.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="mb-4">
            <Field>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={data.name}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, name: e.target.value }))
                }
                required
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">
              { loading ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
