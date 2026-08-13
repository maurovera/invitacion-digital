import type { InvitationConfig } from './invitation.types';

// The future dates below are temporary demo data, not final commercial content.
export const INVITATION_CONFIG = {
  site: {
    defaultLocale: 'es',
    supportedLocales: ['es', 'en'],
    titleKey: 'metadata.title',
    descriptionKey: 'metadata.description',
  },
  event: {
    startDateTime: '2027-10-15T16:00:00-03:00',
    timeZone: 'America/Asuncion',
    durationHours: 5,
    rsvpDeadline: '2027-09-15T23:59:59-03:00',
  },
  couple: {
    bride: {
      name: 'Mio', fullName: 'Akiyama Mio', photo: '/assets/images/bride-circle.png',
      roleKey: 'couple.the-bride', descriptionKey: 'couple.bride-description',
    },
    groom: {
      name: 'Fiqri', fullName: 'M Fiqri Haikhar Anwar', photo: '/assets/images/groom-circle.png',
      roleKey: 'couple.the-groom', descriptionKey: 'couple.groom-description',
    },
    storyKey: 'couple.story-text', quoteKey: 'couple.love-quote',
  },
  envelope: { guestFallbackKey: 'letter.guest' },
  venues: {
    ceremony: {
      name: 'Masjid Songkok Recca Bone', address: 'Jl. Ahmad Yani, Watampone, Bone Regency', time: '4:00 PM',
      mapsUrl: 'https://maps.google.com/maps?q=Masjid%20Songkok%20Recca%20Bone',
      labelKey: 'venue.ceremony-details', notesKeys: ['venue.arrive-early', 'venue.unplugged', 'venue.parking', 'venue.wheelchair'],
    },
    reception: {
      name: 'Hotel Novena Bone', address: 'Jl. Ahmad Yani, Watampone, Bone Regency', time: '6:30 PM',
      mapsUrl: 'https://maps.google.com/maps?q=Hotel%20Novena%20Bone',
      labelKey: 'venue.reception-details', notesKeys: ['venue.welcome-drink', 'venue.open-bar', 'venue.dancing', 'venue.valet'],
    },
  },
  schedule: [
    { id: 'guest-arrival', time: '3:30 PM', titleKey: 'schedule.guest-arrival', descriptionKey: 'schedule.welcome-drinks' },
    { id: 'ceremony', time: '4:00 PM', titleKey: 'schedule.wedding-ceremony', descriptionKey: 'schedule.vows' },
    { id: 'photography', time: '4:30 PM', titleKey: 'schedule.photography', descriptionKey: 'schedule.welcome-drink' },
    { id: 'reception', time: '6:30 PM', titleKey: 'schedule.reception-begins', descriptionKey: 'schedule.dinner-celebration' },
    { id: 'first-dance', time: '7:30 PM', titleKey: 'schedule.first-dance', descriptionKey: 'schedule.special-moment' },
    { id: 'dancing', time: '8:00 PM', titleKey: 'schedule.dancing-party', descriptionKey: 'schedule.celebration-continues' },
    { id: 'send-off', time: '12:00 AM', titleKey: 'schedule.send-off', descriptionKey: 'schedule.sparkler-farewell' },
  ],
  gallery: [
    { id: 1, category: 'engagement', emoji: '💕', captionKey: 'gallery.engagement' },
    { id: 2, category: 'travel', emoji: '✈️', captionKey: 'gallery.travel' },
    { id: 3, category: 'date', emoji: '🌹', captionKey: 'gallery.date' },
    { id: 4, category: 'proposal', emoji: '💍', captionKey: 'gallery.proposal' },
    { id: 5, category: 'family', emoji: '👨‍👩‍👧‍👦', captionKey: 'gallery.family' },
    { id: 6, category: 'friends', emoji: '🎉', captionKey: 'gallery.friends' },
  ],
  music: { audioPath: '/assets/audio/shirushi-lisa.mp3', titleKey: 'music.wedding-music' },
  contact: {
    email: 'wedding@fihaa.my.id', phone: '(555) 123-4567',
    hashtags: ['#FiqriAndMio2025', '#LoveWins', '#ForeverStartsNow'],
    registryPlatforms: ['Gank Now', 'Fantia', 'Trakteer'],
  },
  features: { countdown: true, gallery: true, schedule: true, music: true, rsvp: true },
} as const satisfies InvitationConfig;
