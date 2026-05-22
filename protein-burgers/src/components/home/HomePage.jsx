import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TopBar } from '../layout/TopBar';
import { HeroBackground } from './HeroBackground';
import {
  AthleteSection,
  HeroSection,
  IngredientsSection,
  LandingCta,
  NoPalmOilSection,
  SaucesSection,
  StoryIntro,
} from './StorySections';

export function HomePage({ navigate }) {
  const rootRef = useRef(null);
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);

  useLayoutEffect(() => {
    let removeMetadataListener;
    let animationFrameId;

    const context = gsap.context(() => {
      const heroVideo = videoRef.current;

      if (heroVideo) {
        gsap.fromTo(
          heroVideo,
          { scale: 1 },
          {
            scale: 1.08,
            ease: 'none',
            scrollTrigger: {
              trigger: rootRef.current,
              start: 'top top',
              end: 'bottom bottom',
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        );

        const setupVideoScrub = () => {
          const duration = heroVideo.duration || 1;
          heroVideo.pause();
          heroVideo.currentTime = 0.05;

          let targetTime = 0.05;
          let currentEasedTime = 0.05;
          const ease = 0.085;

          const trigger = ScrollTrigger.create({
            trigger: rootRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              targetTime = self.progress * (duration - 0.12);
            },
          });

          const updateVideoFrame = () => {
            if (heroVideo.readyState >= 2) {
              currentEasedTime += (targetTime - currentEasedTime) * ease;
              heroVideo.currentTime = Math.max(0.02, Math.min(duration - 0.08, currentEasedTime));
            }
            animationFrameId = requestAnimationFrame(updateVideoFrame);
          };

          updateVideoFrame();
          removeMetadataListener = () => trigger.kill();
        };

        if (heroVideo.readyState >= 1) {
          setupVideoScrub();
        } else {
          heroVideo.addEventListener('loadedmetadata', setupVideoScrub, { once: true });
          removeMetadataListener = () => heroVideo.removeEventListener('loadedmetadata', setupVideoScrub);
        }
      }

      gsap.to('.hero-copy', {
        yPercent: -14,
        opacity: 0.2,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: '38% top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.utils.toArray('.story-section').forEach((section) => {
        gsap.fromTo(
          section,
          { autoAlpha: 0.88 },
          {
            autoAlpha: 1,
            ease: 'power2.out',
            scrollTrigger: { trigger: section, start: 'top 82%' },
          },
        );

        gsap.fromTo(
          section.querySelectorAll('.story-reveal'),
          { autoAlpha: 0, y: 56 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 74%' },
          },
        );

        const visuals = section.querySelectorAll('.story-parallax');
        if (visuals.length) {
          gsap.to(visuals, {
            yPercent: -10,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          });
        }
      });

      gsap.to('.oil-drop', {
        y: -28,
        x: 10,
        rotate: 8,
        duration: 3.8,
        stagger: 0.28,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('.health-heart-visual', {
        scale: 1.035,
        duration: 1.15,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, rootRef);

    return () => {
      removeMetadataListener?.();
      cancelAnimationFrame(animationFrameId);
      context.revert();
    };
  }, []);

  return (
    <div ref={rootRef} className="relative min-h-screen bg-[#030405]">
      <HeroBackground videoRef={videoRef} containerRef={videoContainerRef} />

      <div className="homepage-foreground relative z-10">
        <TopBar navigate={navigate} />
        <HeroSection heroRef={heroRef} navigate={navigate} />
        <StoryIntro />
        <NoPalmOilSection />
        <IngredientsSection />
        <SaucesSection />
        <AthleteSection />
        <LandingCta navigate={navigate} />
      </div>
    </div>
  );
}
