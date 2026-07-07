"use client"

import { useState } from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface IntegrationCardProps {
  name: string
  description: string
  icon?: React.ReactNode
  status: IntegrationStatus
  onConnect: () => void
  permissionsLabel: string
  loading?: boolean
  onDisconnect: () => void
}

export type IntegrationStatus = "connected" | "disconnected" | "error"

const statusConfig = {
  connected: { label: "Connected", variant: "default" },
  disconnected: { label: "Not connected", variant: "secondary" },
  error: { label: "Connection error", variant: "destructive" },
}

export function IntegrationCard({
  name,
  description,
  icon,
  status,
  onConnect,
  permissionsLabel,
  loading = false,
  onDisconnect,
}: IntegrationCardProps) {
  const [open, setOpen] = useState(false)

  async function handleConfirm() {
    await onConnect()
    setOpen(false)
  }

  const { label, variant } = statusConfig[status]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-3">
        {icon}
        <div>
          <CardTitle>{name}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Badge variant={variant}>{label}</Badge>
      </CardContent>
      <CardFooter>
        {status === "connected" ? (
          <Button className="flex-1" variant="outline" onClick={onDisconnect}>
            Disconnect
          </Button>
        ) : (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="flex-1" >Connect account</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Connect {name}</DialogTitle>
                <DialogDescription>
                  You&apos;ll be redirected to authorize access.
                  We&apos;ll only request: {permissionsLabel}.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleConfirm} disabled={loading}>
                  {loading ? "Redirecting..." : "Continue"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </CardFooter>
    </Card>
  )
}