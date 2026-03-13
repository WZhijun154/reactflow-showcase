import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { parse } from "yaml";

const ROOT = join(import.meta.dirname, "..");
const DEPLOY_YML_PATH = join(ROOT, ".github", "workflows", "deploy.yml");

describe("US-012: GitHub Actions deploy workflow", () => {
  it("deploy.yml file exists at .github/workflows/deploy.yml", () => {
    assert.ok(
      existsSync(DEPLOY_YML_PATH),
      "Expected .github/workflows/deploy.yml to exist"
    );
  });

  let workflow: Record<string, unknown>;

  it("deploy.yml is valid YAML", () => {
    const content = readFileSync(DEPLOY_YML_PATH, "utf-8");
    workflow = parse(content) as Record<string, unknown>;
    assert.ok(workflow, "Failed to parse deploy.yml as YAML");
  });

  it("has a name field", () => {
    const content = readFileSync(DEPLOY_YML_PATH, "utf-8");
    workflow = parse(content) as Record<string, unknown>;
    assert.ok(
      typeof workflow.name === "string" && workflow.name.length > 0,
      "Expected workflow to have a name"
    );
  });

  describe("triggers", () => {
    it("triggers on push", () => {
      const content = readFileSync(DEPLOY_YML_PATH, "utf-8");
      workflow = parse(content) as Record<string, unknown>;
      const on = workflow.on as Record<string, unknown>;
      assert.ok(on, "Expected 'on' trigger configuration");
      assert.ok(on.push, "Expected push trigger");
    });

    it("triggers on push to main branch", () => {
      const content = readFileSync(DEPLOY_YML_PATH, "utf-8");
      workflow = parse(content) as Record<string, unknown>;
      const on = workflow.on as Record<string, unknown>;
      const push = on.push as Record<string, unknown>;
      const branches = push.branches as string[];
      assert.ok(
        Array.isArray(branches),
        "Expected push.branches to be an array"
      );
      assert.ok(
        branches.includes("main"),
        "Expected push branches to include 'main'"
      );
    });

    it("triggers on push to feature/reactflow-showcase branch", () => {
      const content = readFileSync(DEPLOY_YML_PATH, "utf-8");
      workflow = parse(content) as Record<string, unknown>;
      const on = workflow.on as Record<string, unknown>;
      const push = on.push as Record<string, unknown>;
      const branches = push.branches as string[];
      assert.ok(
        branches.includes("feature/reactflow-showcase"),
        "Expected push branches to include 'feature/reactflow-showcase'"
      );
    });
  });

  describe("permissions", () => {
    it("has pages: write permission", () => {
      const content = readFileSync(DEPLOY_YML_PATH, "utf-8");
      workflow = parse(content) as Record<string, unknown>;
      const perms = workflow.permissions as Record<string, string>;
      assert.ok(perms, "Expected permissions block");
      assert.equal(perms.pages, "write", "Expected pages: write permission");
    });

    it("has id-token: write permission", () => {
      const content = readFileSync(DEPLOY_YML_PATH, "utf-8");
      workflow = parse(content) as Record<string, unknown>;
      const perms = workflow.permissions as Record<string, string>;
      assert.equal(
        perms["id-token"],
        "write",
        "Expected id-token: write permission"
      );
    });

    it("has contents: read permission", () => {
      const content = readFileSync(DEPLOY_YML_PATH, "utf-8");
      workflow = parse(content) as Record<string, unknown>;
      const perms = workflow.permissions as Record<string, string>;
      assert.equal(
        perms.contents,
        "read",
        "Expected contents: read permission"
      );
    });
  });

  describe("build job", () => {
    it("has a build job", () => {
      const content = readFileSync(DEPLOY_YML_PATH, "utf-8");
      workflow = parse(content) as Record<string, unknown>;
      const jobs = workflow.jobs as Record<string, unknown>;
      assert.ok(jobs.build, "Expected a 'build' job");
    });

    it("build job uses actions/checkout", () => {
      const content = readFileSync(DEPLOY_YML_PATH, "utf-8");
      workflow = parse(content) as Record<string, unknown>;
      const jobs = workflow.jobs as Record<string, unknown>;
      const build = jobs.build as Record<string, unknown>;
      const steps = build.steps as Array<Record<string, unknown>>;
      const checkoutStep = steps.find(
        (s) =>
          typeof s.uses === "string" && s.uses.startsWith("actions/checkout")
      );
      assert.ok(checkoutStep, "Expected build job to use actions/checkout");
    });

    it("build job uses actions/setup-node", () => {
      const content = readFileSync(DEPLOY_YML_PATH, "utf-8");
      workflow = parse(content) as Record<string, unknown>;
      const jobs = workflow.jobs as Record<string, unknown>;
      const build = jobs.build as Record<string, unknown>;
      const steps = build.steps as Array<Record<string, unknown>>;
      const setupNodeStep = steps.find(
        (s) =>
          typeof s.uses === "string" && s.uses.startsWith("actions/setup-node")
      );
      assert.ok(
        setupNodeStep,
        "Expected build job to use actions/setup-node"
      );
    });

    it("build job sets up Node.js 20", () => {
      const content = readFileSync(DEPLOY_YML_PATH, "utf-8");
      workflow = parse(content) as Record<string, unknown>;
      const jobs = workflow.jobs as Record<string, unknown>;
      const build = jobs.build as Record<string, unknown>;
      const steps = build.steps as Array<Record<string, unknown>>;
      const setupNodeStep = steps.find(
        (s) =>
          typeof s.uses === "string" && s.uses.startsWith("actions/setup-node")
      ) as Record<string, unknown>;
      const withBlock = setupNodeStep.with as Record<string, unknown>;
      assert.ok(
        String(withBlock["node-version"]).startsWith("20"),
        "Expected Node.js version 20"
      );
    });

    it("build job runs npm ci --legacy-peer-deps", () => {
      const content = readFileSync(DEPLOY_YML_PATH, "utf-8");
      workflow = parse(content) as Record<string, unknown>;
      const jobs = workflow.jobs as Record<string, unknown>;
      const build = jobs.build as Record<string, unknown>;
      const steps = build.steps as Array<Record<string, unknown>>;
      const installStep = steps.find(
        (s) =>
          typeof s.run === "string" &&
          s.run.includes("npm ci") &&
          s.run.includes("--legacy-peer-deps")
      );
      assert.ok(
        installStep,
        "Expected build job to run 'npm ci --legacy-peer-deps'"
      );
    });

    it("build job runs npm run build", () => {
      const content = readFileSync(DEPLOY_YML_PATH, "utf-8");
      workflow = parse(content) as Record<string, unknown>;
      const jobs = workflow.jobs as Record<string, unknown>;
      const build = jobs.build as Record<string, unknown>;
      const steps = build.steps as Array<Record<string, unknown>>;
      const buildStep = steps.find(
        (s) =>
          typeof s.run === "string" && s.run.includes("npm run build")
      );
      assert.ok(buildStep, "Expected build job to run 'npm run build'");
    });

    it("build job uses actions/configure-pages", () => {
      const content = readFileSync(DEPLOY_YML_PATH, "utf-8");
      workflow = parse(content) as Record<string, unknown>;
      const jobs = workflow.jobs as Record<string, unknown>;
      const build = jobs.build as Record<string, unknown>;
      const steps = build.steps as Array<Record<string, unknown>>;
      const configureStep = steps.find(
        (s) =>
          typeof s.uses === "string" &&
          s.uses.startsWith("actions/configure-pages")
      );
      assert.ok(
        configureStep,
        "Expected build job to use actions/configure-pages"
      );
    });

    it("build job uses actions/upload-pages-artifact with path ./out", () => {
      const content = readFileSync(DEPLOY_YML_PATH, "utf-8");
      workflow = parse(content) as Record<string, unknown>;
      const jobs = workflow.jobs as Record<string, unknown>;
      const build = jobs.build as Record<string, unknown>;
      const steps = build.steps as Array<Record<string, unknown>>;
      const uploadStep = steps.find(
        (s) =>
          typeof s.uses === "string" &&
          s.uses.startsWith("actions/upload-pages-artifact")
      ) as Record<string, unknown>;
      assert.ok(
        uploadStep,
        "Expected build job to use actions/upload-pages-artifact"
      );
      const withBlock = uploadStep.with as Record<string, unknown>;
      assert.equal(
        withBlock.path,
        "./out",
        "Expected upload-pages-artifact path to be './out'"
      );
    });
  });

  describe("deploy job", () => {
    it("has a deploy job", () => {
      const content = readFileSync(DEPLOY_YML_PATH, "utf-8");
      workflow = parse(content) as Record<string, unknown>;
      const jobs = workflow.jobs as Record<string, unknown>;
      assert.ok(jobs.deploy, "Expected a 'deploy' job");
    });

    it("deploy job needs build job", () => {
      const content = readFileSync(DEPLOY_YML_PATH, "utf-8");
      workflow = parse(content) as Record<string, unknown>;
      const jobs = workflow.jobs as Record<string, unknown>;
      const deploy = jobs.deploy as Record<string, unknown>;
      assert.ok(
        deploy.needs === "build" ||
          (Array.isArray(deploy.needs) && deploy.needs.includes("build")),
        "Expected deploy job to need build job"
      );
    });

    it("deploy job uses actions/deploy-pages", () => {
      const content = readFileSync(DEPLOY_YML_PATH, "utf-8");
      workflow = parse(content) as Record<string, unknown>;
      const jobs = workflow.jobs as Record<string, unknown>;
      const deploy = jobs.deploy as Record<string, unknown>;
      const steps = deploy.steps as Array<Record<string, unknown>>;
      const deployStep = steps.find(
        (s) =>
          typeof s.uses === "string" &&
          s.uses.startsWith("actions/deploy-pages")
      );
      assert.ok(
        deployStep,
        "Expected deploy job to use actions/deploy-pages"
      );
    });

    it("deploy job has github-pages environment", () => {
      const content = readFileSync(DEPLOY_YML_PATH, "utf-8");
      workflow = parse(content) as Record<string, unknown>;
      const jobs = workflow.jobs as Record<string, unknown>;
      const deploy = jobs.deploy as Record<string, unknown>;
      const env = deploy.environment as Record<string, unknown>;
      assert.ok(env, "Expected deploy job to have an environment");
      assert.equal(
        env.name,
        "github-pages",
        "Expected environment name to be 'github-pages'"
      );
    });

    it("deploy job environment has URL output", () => {
      const content = readFileSync(DEPLOY_YML_PATH, "utf-8");
      workflow = parse(content) as Record<string, unknown>;
      const jobs = workflow.jobs as Record<string, unknown>;
      const deploy = jobs.deploy as Record<string, unknown>;
      const env = deploy.environment as Record<string, unknown>;
      assert.ok(
        typeof env.url === "string" && env.url.includes("page_url"),
        "Expected environment URL to reference page_url output"
      );
    });
  });

  describe("concurrency", () => {
    it("has concurrency settings", () => {
      const content = readFileSync(DEPLOY_YML_PATH, "utf-8");
      workflow = parse(content) as Record<string, unknown>;
      assert.ok(workflow.concurrency, "Expected concurrency configuration");
    });
  });
});

describe("US-012: README live demo link", () => {
  it("README.md contains live demo link", () => {
    const readme = readFileSync(join(ROOT, "README.md"), "utf-8");
    assert.ok(
      readme.toLowerCase().includes("wzhijun154.github.io/reactflow-showcase"),
      "Expected README to contain live demo link to wzhijun154.github.io/reactflow-showcase"
    );
  });

  it("README.md mentions GitHub Actions deployment", () => {
    const readme = readFileSync(join(ROOT, "README.md"), "utf-8");
    assert.ok(
      readme.includes("GitHub Actions") || readme.includes("GitHub Pages"),
      "Expected README to mention GitHub Actions or GitHub Pages deployment"
    );
  });
});

describe("US-012: Build output verification", () => {
  it("out/ directory exists after build", () => {
    assert.ok(
      existsSync(join(ROOT, "out")),
      "Expected out/ directory to exist"
    );
  });

  it("out/index.html exists", () => {
    assert.ok(
      existsSync(join(ROOT, "out", "index.html")),
      "Expected out/index.html to exist"
    );
  });

  it("out/_next/ directory exists with static assets", () => {
    assert.ok(
      existsSync(join(ROOT, "out", "_next")),
      "Expected out/_next/ directory with static assets"
    );
  });

  it("index.html references the basePath /reactflow-showcase", () => {
    const html = readFileSync(join(ROOT, "out", "index.html"), "utf-8");
    assert.ok(
      html.includes("/reactflow-showcase"),
      "Expected index.html to reference basePath /reactflow-showcase"
    );
  });
});

describe("US-012: Static export config", () => {
  it("next.config.ts has output: export", () => {
    const config = readFileSync(join(ROOT, "next.config.ts"), "utf-8");
    assert.ok(
      config.includes('"export"') || config.includes("'export'"),
      "Expected next.config.ts to have output: 'export'"
    );
  });

  it("next.config.ts has basePath: /reactflow-showcase", () => {
    const config = readFileSync(join(ROOT, "next.config.ts"), "utf-8");
    assert.ok(
      config.includes("/reactflow-showcase"),
      "Expected next.config.ts to have basePath: '/reactflow-showcase'"
    );
  });
});
