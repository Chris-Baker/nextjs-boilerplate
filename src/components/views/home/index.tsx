import { ThemeModeSelect } from '@app/components/atoms/theme-mode-select';
import './home.scss';

export function Home() {
    return (
        <main className="home">
            <header className="home__header">
                <span className="home__eyebrow">NEXT.JS BOILERPLATE</span>
                <ThemeModeSelect />
            </header>
            <section className="home__intro" aria-labelledby="intro">
                <p className="home__eyebrow">YOUR NEXT PROJECT</p>
                <h1 className="home__title" id="intro">
                    A familiar foundation.
                    <br />A fresh start.
                </h1>
                <p className="home__description">
                    Next.js, React and TypeScript, with plain SCSS, BEM naming and Hygen generators.
                </p>
                <code className="home__command">npx hygen component new --name button</code>
            </section>
            <div className="home__features">
                <article className="home__feature">
                    <h2 className="home__feature-title">Components</h2>
                    <p>Atoms, molecules, organisms and views. Keep SCSS alongside each component.</p>
                </article>
                <article className="home__feature">
                    <h2 className="home__feature-title">App Router</h2>
                    <p>Server components by default. Add a client boundary when you need interaction.</p>
                </article>
                <article className="home__feature">
                    <h2 className="home__feature-title">Your appearance</h2>
                    <p>Light, dark or your system preference. Your choice is remembered between visits.</p>
                </article>
            </div>
            <footer className="home__footer">
                Edit <code>src/components/views/home</code> to get started.
            </footer>
        </main>
    );
}
