import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { formDevtoolsPlugin } from "@tanstack/react-form-devtools";
import { Toaster } from "@/components/ui/sonner";

const RootLayout = () => {
  return (
    <>
      <Outlet />
      <Toaster />
      <TanStackRouterDevtools />
      <TanStackDevtools
        plugins={[formDevtoolsPlugin()]}
        eventBusConfig={{ debug: true }}
      />
    </>
  );
};

export const Route = createRootRoute({ component: RootLayout });
