export type SupportedLocale = 'es' | 'en';
export type TranslationKey =
  | 'metadata.title' | 'metadata.description' | 'letter.guest'
  | 'couple.the-bride' | 'couple.the-groom'
  | 'couple.bride-description' | 'couple.groom-description'
  | 'couple.story-text' | 'couple.love-quote'
  | 'venue.ceremony-details' | 'venue.reception-details'
  | 'venue.arrive-early' | 'venue.unplugged' | 'venue.parking' | 'venue.wheelchair'
  | 'venue.welcome-drink' | 'venue.open-bar' | 'venue.dancing' | 'venue.valet'
  | 'schedule.guest-arrival' | 'schedule.welcome-drinks'
  | 'schedule.wedding-ceremony' | 'schedule.vows'
  | 'schedule.photography' | 'schedule.welcome-drink'
  | 'schedule.reception-begins' | 'schedule.dinner-celebration'
  | 'schedule.first-dance' | 'schedule.special-moment'
  | 'schedule.dancing-party' | 'schedule.celebration-continues'
  | 'schedule.send-off' | 'schedule.sparkler-farewell'
  | 'gallery.engagement' | 'gallery.travel' | 'gallery.date'
  | 'gallery.proposal' | 'gallery.family' | 'gallery.friends'
  | 'music.wedding-music';

export interface PersonConfig {
  name: string;
  fullName: string;
  photo: string;
  roleKey: TranslationKey;
  descriptionKey: TranslationKey;
}

export interface VenueConfig {
  name: string;
  address: string;
  time: string;
  mapsUrl: string;
  labelKey: TranslationKey;
  notesKeys: readonly TranslationKey[];
}

export interface ScheduleItemConfig {
  id: string;
  time: string;
  titleKey: TranslationKey;
  descriptionKey: TranslationKey;
}

export interface GalleryItemConfig {
  id: number;
  category: string;
  emoji: string;
  captionKey: TranslationKey;
}

export interface InvitationFeatures {
  countdown: boolean;
  gallery: boolean;
  schedule: boolean;
  music: boolean;
  rsvp: boolean;
}

export interface InvitationConfig {
  site: {
    defaultLocale: SupportedLocale;
    supportedLocales: readonly SupportedLocale[];
    titleKey: TranslationKey;
    descriptionKey: TranslationKey;
  };
  event: {
    startDateTime: string;
    timeZone: 'America/Asuncion';
    durationHours: number;
    rsvpDeadline: string;
  };
  couple: {
    bride: PersonConfig;
    groom: PersonConfig;
    storyKey: TranslationKey;
    quoteKey: TranslationKey;
  };
  envelope: { guestFallbackKey: TranslationKey };
  venues: { ceremony: VenueConfig; reception: VenueConfig };
  schedule: readonly ScheduleItemConfig[];
  gallery: readonly GalleryItemConfig[];
  music: { audioPath: string; titleKey: TranslationKey };
  contact: {
    email: string;
    phone: string;
    whatsapp?: string;
    hashtags: readonly string[];
    registryPlatforms: readonly string[];
  };
  features: InvitationFeatures;
}
