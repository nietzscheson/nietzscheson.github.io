import type { Meta, StoryObj } from "@storybook/react-vite";
import { HomePage } from "./HomePage";
import { ArticleTemplate } from "../templates/ArticleTemplate";
import { posts } from "../../content/site";

const meta = { title: "Pages/Site", component: HomePage, parameters: { layout: "fullscreen" } } satisfies Meta<typeof HomePage>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Home: Story = { name: "One page" };
export const HomeStatic: Story = { name: "One page, no motion", args: { animate: false } };
export const Article: Story = {
  name: "Article: Nix",
  render: () => (
    <ArticleTemplate title={posts[0].title} date={posts[0].date} description={posts[0].description} readingTime={posts[0].readingTime} image={posts[0].image}>
      <p>“It works on my machine” is a phrase that has haunted software development for decades. Whether it’s a teammate with a different version of Python, a CI server missing a specific C library, or your global Node.js version conflicting with a legacy project, environment drift is a silent productivity killer.</p>
      <p>I resolved this by moving my entire development workflow to <strong>Nix Flakes</strong>.</p>
      <blockquote>Nix guarantees that if a project works today, it will work exactly the same way six months from now, or on a completely different machine.</blockquote>
      <h3>Why Nix?</h3>
      <p>In modern software development we don’t just write code; we manage a fleet of tools. Nix provides a declarative way to handle:</p>
      <ul>
        <li><strong>Isolation.</strong> No more polluting your global <code>/usr/local/bin</code>. Every tool stays within the project.</li>
        <li><strong>Reproducibility.</strong> Every dependency is pinned. If I use Python 3.12.1, everyone on the team does.</li>
        <li><strong>Automation.</strong> With <code>shellHook</code> we can start services, credential helpers and environment variables.</li>
      </ul>
      <pre><code>{`{
  description = "DevShell with Terraform, Docker, Python and ECR login";
  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
}`}</code></pre>
    </ArticleTemplate>
  ),
};
