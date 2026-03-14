import { t } from "ttag";

import {
  SettingsPageWrapper,
  SettingsSection,
} from "metabase/admin/components/SettingsSection";
import { SettingHeader } from "metabase/admin/settings/components/SettingHeader";
import { AdminSettingInput } from "metabase/admin/settings/components/widgets/AdminSettingInput";
import { ThemeLiteColorSettingsWidget } from "metabase/admin/settings/components/widgets/ThemeLiteColorSettingsWidget";
import { Box, Text } from "metabase/ui";

export function ThemeManagementSettingsPage() {
  return (
    <SettingsPageWrapper
      title={t`Appearance`}
      description={t`Manage internal branding for this lab environment without relying on enterprise whitelabeling.`}
    >
      <SettingsSection title={t`Identity`}>
        <AdminSettingInput
          name="theme-lite-application-name"
          title={t`Application name`}
          description={t`Optional override for the app name shown in the UI and browser chrome.`}
          inputType="text"
        />

        <AdminSettingInput
          name="theme-lite-favicon-url"
          title={t`Favicon URL`}
          description={t`Optional favicon override. Leave blank to keep the default favicon.`}
          inputType="text"
        />
      </SettingsSection>

      <SettingsSection title={t`Colors`}>
        <Box>
          <SettingHeader
            id="theme-lite-colors"
            title={t`Color palette`}
            description={t`Set brand and chart colors for the internal theme. Refresh the browser if an older screen does not repaint immediately.`}
          />
        </Box>

        <ThemeLiteColorSettingsWidget />
      </SettingsSection>

      <SettingsSection title={t`Behavior`}>
        <AdminSettingInput
          name="loading-message"
          title={t`Loading message`}
          inputType="select"
          options={[
            { label: t`Doing science`, value: "doing-science" },
            { label: t`Running query`, value: "running-query" },
            { label: t`Loading results`, value: "loading-results" },
          ]}
        />
        <Text c="text-secondary" size="sm">
          {t`This screen is intentionally lightweight. If we need more branding controls later, we can extend it here without reopening premium-gated pages.`}
        </Text>
      </SettingsSection>
    </SettingsPageWrapper>
  );
}
