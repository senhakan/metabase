import { screen } from "__support__/ui";

import {
  setup as baseSetup,
  ossRoutes,
  premiumRoutes,
  routeObjtoArray,
  upsellRoutes,
} from "./setup";

const setup = async ({ isAdmin = true, initialRoute = "" } = {}) => {
  return baseSetup({
    enterprisePlugins: undefined,
    hasTokenFeatures: false,
    isAdmin,
    initialRoute,
  });
};

const routes = routeObjtoArray(ossRoutes);
const notFoundRoutes = routeObjtoArray(premiumRoutes);
const upsells = routeObjtoArray(upsellRoutes);

describe("Admin Settings Routing - OSS", () => {
  it("renders the settings editor", async () => {
    await setup({ isAdmin: true });
    expect(
      await screen.findByTestId("admin-layout-content"),
    ).toBeInTheDocument();
  });

  describe("renders the OSS routes", () => {
    it.each(routes)(
      "renders the $name route",
      async ({ path, testPattern }) => {
        await setup({ isAdmin: true, initialRoute: path });
        expect(await screen.findByText(testPattern)).toBeInTheDocument();
      },
    );
  });

  describe("renders the appearance aliases", () => {
    it.each(upsells)(
      "renders the $name route",
      async ({ path, testPattern }) => {
        await setup({ isAdmin: true, initialRoute: path });
        expect(await screen.findByText(testPattern)).toBeInTheDocument();
      },
    );
  });

  describe("does not render the premium routes", () => {
    it.each(notFoundRoutes)(
      "should not find the $name enterprise route",
      async ({ path }) => {
        await setup({ isAdmin: true, initialRoute: path });
        expect(
          await screen.findByText("We're a little lost..."),
        ).toBeInTheDocument();
      },
    );

    it.each(["/updates", "/license", "/cloud"])(
      "should not find the removed route %s",
      async (path) => {
        await setup({ isAdmin: true, initialRoute: path });
        expect(
          await screen.findByText("We're a little lost..."),
        ).toBeInTheDocument();
      },
    );
  });
});
