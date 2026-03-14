(ns metabase.appearance.core
  (:require
   [clojure.string :as str]
   [metabase.appearance.settings]
   [potemkin :as p]))

(comment metabase.appearance.settings/keep-me)

(p/import-vars
 [metabase.appearance.settings
  application-color
  application-colors
  application-favicon-url
  application-font
  application-font-files
  application-logo-url
  application-name
  custom-formatting
  custom-homepage
  custom-homepage-dashboard
  example-dashboard-id
  help-link
  help-link-custom-destination
  landing-page
  landing-page-illustration
  landing-page-illustration-custom
  loading-message
  login-page-illustration
  login-page-illustration-custom
  no-data-illustration
  no-data-illustration-custom
  no-object-illustration
  no-object-illustration-custom
  secondary-chart-color
  show-homepage-data
  show-homepage-pin-message
  show-metabase-links
  show-metabot
  theme-lite-application-name
  theme-lite-colors
  theme-lite-favicon-url
  site-name
  site-name!])

(defn- non-blank-string [s]
  (let [s (some-> s str str/trim)]
    (when (seq s) s)))

(defn resolved-application-name []
  (or (non-blank-string (theme-lite-application-name))
      (application-name)))

(defn resolved-favicon-url []
  (or (non-blank-string (theme-lite-favicon-url))
      (application-favicon-url)))

(defn apply-theme-lite-overrides [settings]
  (cond-> settings
    (seq (theme-lite-colors))
    (update :application-colors #(merge (or % {}) (theme-lite-colors)))

    (non-blank-string (theme-lite-application-name))
    (assoc :application-name (resolved-application-name))

    (non-blank-string (theme-lite-favicon-url))
    (assoc :application-favicon-url (resolved-favicon-url))

    :always
    (assoc :analytics-uuid ""
           :anon-tracking-enabled false
           :bug-reporting-enabled false
           :check-for-updates false
           :help-link :hidden
           :help-link-custom-destination ""
           :map-tile-server-url ""
           :show-metabase-links false
           :snowplow-enabled false
           :snowplow-url ""
           :store-url "")))
