"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { IntegrationCard } from "@/components/cards/integrationCard";
import { useSearchParams } from "next/navigation";
import { useIntegrations } from "@/hooks/integrations/useIntegrations";
import { INTEGRATIONS } from "@/constants/integrations";

export default function Integrations() {
  const searchParams = useSearchParams();

  const {
    handleConnectIntegration,
    handleDisconnectIntegration,
    integrations: connectedIntegrations,
    loading,
    error,
  } = useIntegrations();

  useEffect(() => {
    const integration = searchParams.get("integration");
    const statusParam = searchParams.get("status");

    if (!integration || !statusParam) return;

    const integrationData = INTEGRATIONS.find((i) => i.key === integration);

    const integrationName = integrationData?.name ?? integration;

    requestAnimationFrame(() => {
      if (statusParam === "success") {
        toast.success(`${integrationName} connected successfully`);
      } else {
        toast.error(`Failed to connect ${integrationName}`);
      }
    });
  }, [searchParams]);

  const integrationCards = INTEGRATIONS.map((integration) => {
    const account = connectedIntegrations?.find(
      (i) => i.platform === integration.platform,
    );

    return {
      name: integration.name,
      description: integration.description,
      status: account?.is_connected
        ? "connected"
        : error
          ? "error"
          : "disconnected",
      onConnect: () =>
        handleConnectIntegration(integration.name, integration.key),
      onDisconnect: account
        ? () => handleDisconnectIntegration(account.id, integration.name)
        : undefined,
      loading: loading,
      permissionsLabel: integration.permissionsLabel,
    };
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Integrations</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {integrationCards.map((integration) => (
          <IntegrationCard key={integration.name} {...integration} />
        ))}
      </div>
    </div>
  );
}
