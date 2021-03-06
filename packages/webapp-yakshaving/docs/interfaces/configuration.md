**[yakshaving - v0.5.1](../README.md)**

> [Globals](../README.md) / Configuration

# Interface: Configuration

Represents configuration options

**`property`** projectRoot - Absolute path to your application's root directory

**`property`** entryPoint - Entry-point(s) to your application

**`property`** outputDirectory - Output directory

**`property`** additionalPlugins - Additional plugins to be used

**`property`** advanced - Advanced options

**`property`** advanced.ignoredDependencies - Dependencies to be ignored for dev deps bundle

**`property`** advanced.rollupOptions - Override rollup options

**`property`** advanced.rollupOptions.input - Rollup input options

**`property`** advanced.rollupOptions.output - Rollup output options

**`property`** pluginOptions - Override default plugin options for app bundle

**`property`** pluginOptions.commonJs - CommonJs plugin options

**`property`** pluginOptions.nodeResolve - NodeResolve plugin options

**`property`** pluginOptions.typescript - Typescript plugin options

**`property`** pluginOptions.sucrase - Sucrase plugin options

**`property`** pluginOptions.terser - Terser plugin options

**`property`** pluginOptions.replace - Values to replaced in bundle

## Hierarchy

* **Configuration**

## Index

### Properties

* [additionalPlugins](configuration.md#additionalplugins)
* [advanced](configuration.md#advanced)
* [entryPoint](configuration.md#entrypoint)
* [outputDirectory](configuration.md#outputdirectory)
* [projectRoot](configuration.md#projectroot)

## Properties

### additionalPlugins

•  **additionalPlugins**: Plugin[]

*Defined in [packages/webapp-yakshaving/source/modules/configuration/schema-types.ts:57](https://github.com/d-zone-org/d-zone/blob/e55b933/packages/webapp-yakshaving/source/modules/configuration/schema-types.ts#L57)*

___

### advanced

• `Optional` **advanced**: undefined \| { ignoredDependencies?: string[] ; pluginOptions?: undefined \| { commonJs?: RollupCommonJSOptions ; nodeResolve?: RollupNodeResolveOptions ; replace?: Record\<string, string> ; sucrase?: [RollupSucraseOptions](../README.md#rollupsucraseoptions) ; terser?: TerserOptions ; typescript?: RollupTypescriptOptions  } ; rollupOptions: { input?: RollupInputOptions ; output?: RollupOutputOptions  }  }

*Defined in [packages/webapp-yakshaving/source/modules/configuration/schema-types.ts:59](https://github.com/d-zone-org/d-zone/blob/e55b933/packages/webapp-yakshaving/source/modules/configuration/schema-types.ts#L59)*

___

### entryPoint

•  **entryPoint**: InputOption

*Defined in [packages/webapp-yakshaving/source/modules/configuration/schema-types.ts:55](https://github.com/d-zone-org/d-zone/blob/e55b933/packages/webapp-yakshaving/source/modules/configuration/schema-types.ts#L55)*

___

### outputDirectory

•  **outputDirectory**: string

*Defined in [packages/webapp-yakshaving/source/modules/configuration/schema-types.ts:56](https://github.com/d-zone-org/d-zone/blob/e55b933/packages/webapp-yakshaving/source/modules/configuration/schema-types.ts#L56)*

___

### projectRoot

•  **projectRoot**: string

*Defined in [packages/webapp-yakshaving/source/modules/configuration/schema-types.ts:54](https://github.com/d-zone-org/d-zone/blob/e55b933/packages/webapp-yakshaving/source/modules/configuration/schema-types.ts#L54)*
