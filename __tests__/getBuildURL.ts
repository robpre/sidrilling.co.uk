import { getBuildURL } from "@/lib/getBuildURL";
import * as _mockedConfig from "@/config";

type Config = typeof _mockedConfig;
type MockedConfig = jest.Mocked<Config> & {
  setVal<K extends keyof Config>(key: K, val: Config[K] | undefined): void;
  reset(): void;
};
type Writeable<T> = { -readonly [P in keyof T]: T[P] };

jest.mock("@/config", () => {
  let cache: Partial<Writeable<MockedConfig>>;

  const reset = () => {
    cache = {
      setVal: (k, v) => {
        cache[k] = v as any;
      },
      reset,
    };
  };

  reset();

  const mockedEnv = new Proxy<typeof cache>(
    {},
    {
      get<K extends keyof MockedConfig>(obj: MockedConfig, k: K) {
        switch (k) {
          case "__esModule":
            return true;
          default:
            return cache[k];
        }
      },
    }
  ) as MockedConfig;

  return mockedEnv;
});

const mockedConfig = _mockedConfig as MockedConfig;

afterEach(() => {
  mockedConfig.reset();
});

test("generated url is overridden by BASE_URL", () => {
  mockedConfig.setVal("BASE_URL", "http://foo.com");
  mockedConfig.setVal("BRANCH_NAME", "main");

  expect(getBuildURL()).toBe("http://foo.com");
});

test("generated url from main branch", () => {
  mockedConfig.setVal("BRANCH_NAME", "main");

  expect(getBuildURL()).toBe("https://www.sidrilling.co.uk");

  mockedConfig.setVal("BRANCH_NAME", undefined);

  expect(getBuildURL()).toBe("https://www.sidrilling.co.uk");
});

test("generated url from git branch", () => {
  mockedConfig.setVal("BRANCH_NAME", "not-main");

  expect(getBuildURL()).toBe(
    "https://sidrillingcouk-git-not-main-robpre.vercel.app"
  );
});

test("truncated url from git branch", () => {
  mockedConfig.setVal(
    "BRANCH_NAME",
    "this-is-really-an-extremely-long-branch-name"
  );

  expect(getBuildURL().length).toBe(
    "https://".length + ".vercel.app".length + 63
  );

  expect(getBuildURL()).toBe(
    "https://sidrillingcouk-git-this-is-really-an-extremely-lo-UqlqSk-robpre.vercel.app"
  );
});

test("development env url", () => {
  mockedConfig.setVal("NODE_ENV", "development");

  expect(getBuildURL()).toBe("http://localhost:3000");
});
