'use client';

import { useState, useEffect } from 'react';
import { useScrollSpy } from '@/hooks/use-scroll-spy';
import { LetterAnimation } from '@/components';
import {
  HeroSection,
  CoupleIntroduction,
  WeddingDetailsCard,
  CountdownTimer,
  VenueInformation,
  EventSchedule,
  RSVP,
  GalleryPreview,
  ClosingMessage,
  FloatingNavigation,
  NavigationFAB,
  MusicPlayer,
  ScrollProgressIndicator,
} from '../components';
import { getEnabledNavigationSections } from '@/constants';
import { INVITATION_CONFIG } from '@/config';

export default function HomeView() {
  const config = INVITATION_CONFIG;
  const navigationSections = getEnabledNavigationSections(config.features);
  const progressionSections = [...navigationSections.map(({ id }) => id), 'closing'];
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLetter, setShowLetter] = useState(true);

  // Auto-detect active section using scroll spy
  const activeSection = useScrollSpy(
    progressionSections
  );

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const handleLetterOpen = () => {
    setShowLetter(false);
    setTimeout(() => setIsLoaded(true), 300);
  };

  // Show letter animation first
  if (showLetter) {
    return (
      <LetterAnimation
        onOpen={handleLetterOpen}
        coupleName={`${config.couple.bride.name} & ${config.couple.groom.name}`}
        guestFallbackKey={config.envelope.guestFallbackKey}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      <FloatingNavigation
        activeSection={activeSection}
        onScrollToSection={scrollToSection}
        sections={navigationSections}
      />

      {/* Hero Section */}
      <section id="hero" className="relative">
        <HeroSection
          isLoaded={isLoaded}
          couple={config.couple}
          showRsvpCta={config.features.rsvp}
          onScrollToSection={scrollToSection}
        />
      </section>

      {/* Couple Introduction */}
      <section id="couple" className="relative">
        <CoupleIntroduction
          bride={config.couple.bride}
          groom={config.couple.groom}
          storyKey={config.couple.storyKey}
          quoteKey={config.couple.quoteKey}
          isVisible={isLoaded}
        />
      </section>

      {/* Wedding Details */}
      <section id="details" className="relative">
        <WeddingDetailsCard
          event={config.event}
          venue={config.venues}
        />
        {config.features.countdown && (
          <CountdownTimer targetDateTime={config.event.startDateTime} />
        )}
      </section>

      {/* Venue Information */}
      <section id="venue" className="relative">
        <VenueInformation venue={config.venues} />
        {config.features.schedule && <EventSchedule items={config.schedule} />}
      </section>

      {/* Gallery Preview */}
      {config.features.gallery && (
        <section id="gallery" className="relative">
          <GalleryPreview items={config.gallery} />
        </section>
      )}

      {/* RSVP Section */}
      {config.features.rsvp && (
        <section id="rsvp" className="relative">
          <RSVP contact={config.contact} deadline={config.event.rsvpDeadline} timeZone={config.event.timeZone} />
        </section>
      )}

      {/* Closing Message */}
      <section id="closing" className="relative">
        <ClosingMessage
          bride={config.couple.bride.fullName}
          groom={config.couple.groom.fullName}
          hashtags={config.contact.hashtags}
          email={config.contact.email}
        />
      </section>

      {/* Music Player */}
      {config.features.music && <MusicPlayer {...config.music} />}

      {/* Mobile Navigation FAB */}
      <NavigationFAB
        activeSection={activeSection}
        onScrollToSection={scrollToSection}
        sections={progressionSections}
      />

      {/* Scroll Progress Indicator */}
      <ScrollProgressIndicator activeSection={activeSection} sections={progressionSections} />
    </div>
  );
}
