import { useState } from "react";

import { useUserSetting } from "metabase/common/hooks";

export const ModelExplanationBanner = () => {
  useUserSetting("dismissed-browse-models-banner");
  useState(false);
  return null;
};
