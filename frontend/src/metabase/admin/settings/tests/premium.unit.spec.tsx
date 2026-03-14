import { screen, waitFor } from "__support__/ui";

import {
  setup as baseSetup,
  enterpriseRoutes,
  ossRoutes,
  premiumRoutes,
  routeObjtoArray,
  upsellRoutes,
} from "./setup";

const setup = async ({
  isAdmin = true,
  initialRoute = "",
  features = {},
} = {}) => {
  await baseSetup({
    hasTokenFeatures: true,
    isAdmin,
    features,
    initialRoute,
    enterprisePlugins: "*", // means all enterprise plugins
  });
};

const routes = routeObjtoArray({
  ...ossRoutes,
  ...premiumRoutes,
  ...upsellRoutes,
  ...enterpriseRoutes,
});

describe("Admin Settings Routing - Enterprise with all features", () => {
  it("renders the settings editor", async () => {
    await setup({ isAdmin: true });
    expect(
      await screen.findByTestId("admin-layout-content"),
    ).toBeInTheDocument();
  });

  describe("renders all the routes", () => {
    it.each(routes)(
      "renders the $name route",
      async ({ path, testPattern, role }) => {
        await setup({ isAdmin: true, initialRoute: path });
        await waitFor(() => {
          expect(
            role
              ? screen.getByRole(role, { name: testPattern })
              : screen.getByText(testPattern),
          ).toBeInTheDocument();
        });
      },
    );
  });
});
