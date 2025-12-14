import { render, screen } from '@testing-library/react';
import AnimatedHero from '@/components/AnimatedHero';

describe('AnimatedHero', () => {
  it('renders children content', () => {
    render(
      <AnimatedHero>
        <h1>Test Hero Content</h1>
      </AnimatedHero>
    );

    expect(screen.getByText('Test Hero Content')).toBeInTheDocument();
  });

  it('displays the first role initially', () => {
    render(
      <AnimatedHero>
        <div>Content</div>
      </AnimatedHero>
    );

    // Check if at least one of the roles is present
    const roles = ['AI Engineer', 'Applied Machine Learning Engineer', 'Generative AI Prototyper', 'Full Stack Builder'];
    const hasRole = roles.some(role => screen.queryByText(role) !== null);
    expect(hasRole).toBe(true);
  });
});
