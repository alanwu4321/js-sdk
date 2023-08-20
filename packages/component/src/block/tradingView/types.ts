export type ColorTheme = "light" | "dark";

export type Timezone =
  | "Etc/UTC"
  | "exchange"
  | "Pacific/Honolulu"
  | "America/Juneau"
  | "America/Los_Angeles"
  | "America/Vancouver"
  | "US/Mountain"
  | "America/Phoenix"
  | "America/El_Salvador"
  | "America/Bogota"
  | "America/Chicago"
  | "America/Mexico_City"
  | "America/Lima"
  | "America/Caracas"
  | "America/New_York"
  | "America/Toronto"
  | "America/Argentina/Buenos_Aires"
  | "America/Santiago"
  | "America/Sao_Paulo"
  | "Atlantic/Reykjavik"
  | "Europe/Dublin"
  | "Europe/Lisbon"
  | "Europe/London"
  | "Europe/Amsterdam"
  | "Europe/Belgrade"
  | "Europe/Berlin"
  | "Europe/Brussels"
  | "Europe/Copenhagen"
  | "Africa/Lagos"
  | "Europe/Luxembourg"
  | "Europe/Madrid"
  | "Europe/Malta"
  | "Europe/Oslo"
  | "Europe/Paris"
  | "Europe/Rome"
  | "Europe/Stockholm"
  | "Europe/Warsaw"
  | "Europe/Zurich"
  | "Europe/Athens"
  | "Afrika/Cairo"
  | "Europe/Helsinki"
  | "Asia/Jerusalem"
  | "Africa/Johannesburg"
  | "Europe/Riga"
  | "Europe/Tallinn"
  | "Europe/Vilnius"
  | "Asia/Bahrain"
  | "Europe/Istanbul"
  | "Asia/Kuwait"
  | "Europe/Moscow"
  | "Asia/Qatar"
  | "Asia/Riyadh"
  | "Asia/Tehran"
  | "Asia/Dubai"
  | "Asia/Muscat"
  | "Asia/Ashkhabad"
  | "Asia/Kolkata"
  | "Asia/Almaty"
  | "Asia/Bangkok"
  | "Asia/Ho_Chi-Minh"
  | "Asia/Jakarta"
  | "Asia/Chongqing"
  | "Asia/Hong_Kong"
  | "Asia/Manila"
  | "Australia/Perth"
  | "Asia/Shanghai"
  | "Asia/Singapore"
  | "Asia/Taipei"
  | "Asia/Tokyo"
  | "Asia/Seoul"
  | "Australia/Brisbane"
  | "Australia/Adelaide"
  | "Australia/Sydney"
  | "Pacific/Norfolk"
  | "Pacific/Auckland"
  | "Pacific/Fakaofo"
  | "Pacific/Chatham";

export type WidgetFeatures =
  | "header_widget"
  | "header_widget_dom_node"
  | "header_symbol_search"
  | "symbol_search_hot_key"
  | "header_resolutions"
  | "header_interval_dialog_button"
  | "show_interval_dialog_on_key_press"
  | "header_chart_type"
  | "header_settings"
  | "header_indicators"
  | "header_compare"
  | "header_undo_redo"
  | "header_screenshot"
  | "header_fullscreen_button"
  | "compare_symbol"
  | "border_around_the_chart"
  | "header_saveload"
  | "left_toolbar"
  | "control_bar"
  | "timeframes_toolbar"
  | "show_hide_button_in_legend"
  | "format_button_in_legend"
  | "study_buttons_in_legend"
  | "delete_button_in_legend"
  | "context_menus"
  | "pane_context_menu"
  | "scales_context_menu"
  | "legend_context_menu"
  | "main_series_scale_menu"
  | "display_market_status"
  | "remove_library_container_border"
  | "chart_property_page_style"
  | "property_pages"
  | "show_chart_property_page"
  | "chart_property_page_scales"
  | "chart_property_page_background"
  | "chart_property_page_timezone_sessions"
  | "chart_property_page_trading"
  | "countdown"
  | "caption_buttons_text_if_possible"
  | "dont_show_boolean_study_arguments"
  | "hide_last_na_study_output"
  | "symbol_info"
  | "timezone_menu"
  | "snapshot_trading_drawings"
  | "source_selection_markers"
  | "go_to_date"
  | "adaptive_logo"
  | "show_dom_first_time"
  | "hide_left_toolbar_by_default"
  | "use_localstorage_for_settings"
  | "items_favoriting"
  | "save_chart_properties_to_local_storage"
  | "create_volume_indicator_by_default"
  | "create_volume_indicator_by_default_once"
  | "volume_force_overlay"
  | "right_bar_stays_on_scroll"
  | "constraint_dialogs_movement"
  | "charting_library_debug_mode"
  | "show_dialog_on_snapshot_ready"
  | "study_market_minimized"
  | "study_dialog_search_control"
  | "side_toolbar_in_fullscreen_mode"
  | "same_data_requery"
  | "disable_resolution_rebuild"
  | "chart_scroll"
  | "chart_zoom"
  | "high_density_bars"
  | "cl_feed_return_all_data"
  | "uppercase_instrument_names"
  | "no_min_chart_width"
  | "fix_left_edge"
  | "lock_visible_time_range_on_resize"
  | "study_templates"
  | "datasource_copypaste"
  | "seconds_resolution";

export type Locales =
  | "en"
  | "in"
  | "de_DE"
  | "fr"
  | "es"
  | "it"
  | "pl"
  | "sv_SE"
  | "tr"
  | "ru"
  | "br"
  | "id"
  | "ms_MY"
  | "th_TH"
  | "vi_VN"
  | "ja"
  | "kr"
  | "zh_CN"
  | "zh_TW"
  | "ar_AE"
  | "he_IL";

export type TimeInterval =
  | "1"
  | "3"
  | "5"
  | "15"
  | "30"
  | "60"
  | "120"
  | "240"
  | "720"
  | "1D"
  | "1W";
