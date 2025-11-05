import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import Loader from "../Loader";

export default function UserTasksModal({
  open,
  onClose,
  user,
  tasks = [],
  loading,
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-background text-foreground shadow-lg border border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            {user?.username || "User"}’s Tasks
          </DialogTitle>
          <DialogDescription>
            Viewing all tasks created by {user?.email}
          </DialogDescription>
        </DialogHeader>

        <Separator className="my-3" />

        {loading ? (
          <Loader text="Loading tasks..." />
        ) : (
          <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <Card
                  key={task._id}
                  className="border-border bg-card shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <CardContent className="py-3">
                    <h3 className="text-lg font-semibold">{task.title}</h3>
                    <p className="text-muted-foreground text-sm mt-1">
                      {task.description}
                    </p>
                    <p className="text-sm mt-2">
                      Status:{" "}
                      <span
                        className={
                          task.completed
                            ? "text-green-500 font-medium"
                            : "text-red-500 font-medium"
                        }
                      >
                        {task.completed ? "Completed" : "Pending"}
                      </span>
                    </p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-muted-foreground text-sm text-center">
                No tasks found for this user.
              </p>
            )}
          </div>
        )}

        <div className="flex justify-end mt-5">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
