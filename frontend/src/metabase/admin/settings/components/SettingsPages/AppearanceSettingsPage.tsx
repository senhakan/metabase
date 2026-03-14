import { ThemeManagementSettingsPage } from "./ThemeManagementSettingsPage";

export function AppearanceSettingsPage({
  tab: _tab,
}: {
  tab?: "branding" | "conceal-metabase";
}) {
  return <ThemeManagementSettingsPage />;
}
