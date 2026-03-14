import { useDebouncedCallback } from "@mantine/hooks";
import { useEffect, useMemo, useState } from "react";
import { t } from "ttag";
import _ from "underscore";

import { useAdminSetting } from "metabase/api/utils";
import { ColorPicker } from "metabase/common/components/ColorPicker";
import {
  Box,
  Group,
  SimpleGrid,
  Stack,
  Text,
  useMantineTheme,
} from "metabase/ui";
import type { ColorSettings } from "metabase-types/api";

interface ColorFieldProps {
  value?: string;
  fallback: string;
  label: string;
  description?: string;
  onChange: (value?: string) => void;
}

function ColorField({
  value,
  fallback,
  label,
  description,
  onChange,
}: ColorFieldProps) {
  return (
    <Stack gap="xs">
      <Text fw="bold">{label}</Text>
      {description && (
        <Text c="text-secondary" size="sm">
          {description}
        </Text>
      )}
      <ColorPicker
        value={value ?? fallback}
        placeholder={fallback}
        isAuto={value == null}
        onChange={onChange}
      />
    </Stack>
  );
}

export const ThemeLiteColorSettingsWidget = () => {
  const {
    value: colorSettings,
    updateSetting,
    settingDetails,
  } = useAdminSetting("theme-lite-colors");
  const theme = useMantineTheme();
  const [localColors, setLocalColors] = useState<ColorSettings>({});
  const brandFields = useMemo(
    () => [
      {
        key: "brand",
        label: t`Brand`,
        description: t`Primary actions and links`,
      },
      {
        key: "filter",
        label: t`Filter`,
        description: t`Filter chips and related highlights`,
      },
      {
        key: "summarize",
        label: t`Summarize`,
        description: t`Notebook summarize actions`,
      },
    ],
    [],
  );
  const chartFields = useMemo(
    () =>
      Array.from({ length: 8 }, (_, index) => ({
        key: `accent${index}`,
        label: t`Accent ${index + 1}`,
      })),
    [],
  );

  useEffect(() => {
    setLocalColors(colorSettings ?? {});
  }, [colorSettings]);

  const themeColors = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(theme.colors).map(([colorName, color]) => [
          colorName,
          color[theme.primaryShade as number],
        ]),
      ),
    [theme.colors, theme.primaryShade],
  );

  const handlePersist = async (nextColors: ColorSettings) => {
    await updateSetting({
      key: "theme-lite-colors",
      value: nextColors,
    });
    theme.other?.updateColorSettings?.(nextColors);
  };

  const onChangeDebounced = useDebouncedCallback(handlePersist, 400);

  const handleChange = (key: string, value?: string) => {
    const nextColors = value
      ? { ...localColors, [key]: value }
      : _.omit(localColors, key);

    setLocalColors(nextColors);
    onChangeDebounced(nextColors);
  };

  if (!colorSettings) {
    return null;
  }

  if (settingDetails?.is_env_setting && settingDetails?.env_name) {
    return (
      <Text c="text-secondary" size="sm">
        {t`This setting is managed by environment variable:`}{" "}
        <code>{settingDetails.env_name}</code>
      </Text>
    );
  }

  return (
    <Stack gap="xl">
      <Box>
        <Text fw="bold" mb="md">
          {t`User interface colors`}
        </Text>
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
          {brandFields.map((field) => (
            <ColorField
              key={field.key}
              value={localColors[field.key]}
              fallback={themeColors[field.key] ?? theme.colors.brand[0]}
              label={field.label}
              description={field.description}
              onChange={(value) => handleChange(field.key, value)}
            />
          ))}
        </SimpleGrid>
      </Box>

      <Box>
        <Group justify="space-between" mb="md">
          <Text fw="bold">{t`Chart colors`}</Text>
          <Text c="text-secondary" size="sm">
            {t`Leave a value empty to fall back to the generated palette.`}
          </Text>
        </Group>
        <SimpleGrid cols={{ base: 2, md: 4 }} spacing="lg">
          {chartFields.map((field) => (
            <ColorField
              key={field.key}
              value={localColors[field.key]}
              fallback={themeColors[field.key] ?? theme.colors.brand[0]}
              label={field.label}
              onChange={(value) => handleChange(field.key, value)}
            />
          ))}
        </SimpleGrid>
      </Box>
    </Stack>
  );
};
