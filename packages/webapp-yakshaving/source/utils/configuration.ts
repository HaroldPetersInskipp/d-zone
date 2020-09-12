import z from 'zod'
import defaultsMerge from 'defaults-deep-ts'

import type {
	rollup as RollupFn,
	watch as WatchFn,
	RollupOptions as RollupInputOptions,
	OutputOptions as RollupOutputOptions,
	WatcherOptions as RollupWatchOptions,
	Plugin,
	PluginImpl,
} from 'rollup'

import type PluginCommonJs from '@rollup/plugin-commonjs'
import type { nodeResolve as PluginNodeResolve } from '@rollup/plugin-node-resolve'
import type PluginReplace from '@rollup/plugin-replace'
import type PluginTypescript from '@rollup/plugin-typescript'
import type PluginSucrase from '@rollup/plugin-sucrase'
import type { terser as PluginTerser } from 'rollup-plugin-terser'

/**
 * Represents required plugins for yakshaving
 * @property plugin - Plugin factory function
 * @property devConfig - Config to be used in development mode
 * @property prodConfig - Config to be used in production mode
 */
export interface PluginAndOptions<P extends PluginImpl<any>> {
	plugin?: P

	config?: {
		common?: Parameters<P>[0]
		development?: Parameters<P>[0]
		production?: Parameters<P>[0]
	}
}

const pluginAndOptionsSchema = z
	.object({
		plugin: z.function(),

		config: z
			.object({
				common: z.record(z.unknown()),
				development: z.record(z.unknown()),
				production: z.record(z.unknown()),
			})
			.optional(),
	})
	.deepPartial()

/**
 * Configuration Options
 * @property options.projectRoot - Projects root directory
 * @property options.entryPoint - Entry point(s) to your application
 * @property options.outputDirectory - Projects output directory
 *
 * @property options.ignoredDepsBundleDependencies - Dependencies to be ignored in dev dependencies bundle
 * @property options.additionalPlugins - Function (can be async) resolving additional plugins
 *
 * @property options.advanced - Advanced configuration
 *
 * @property options.advanced.rollup - Tuple with rollup config and optionally rollup method
 * @property options.advanced.watch - Tuple with watcher config and optionally watch method
 *
 * @property options.advanced.corePluginAndOptions - Core plugins and options
 * @property options.advanced.corePluginAndOptions.commonJs - CommonJs plugin and options
 * @property options.advanced.corePluginAndOptions.nodeResolve - Node resolve plugin and options
 * @property options.advanced.corePluginAndOptions.replace - Replace plugin
 * @property options.advanced.corePluginAndOptions.sucrase - Sucrase plugin and options
 * @property options.advanced.corePluginAndOptions.typescript - Typescript plugin and options
 * @property options.advanced.corePluginAndOptions.terser - Terser plugin and options
 */
export interface ConfigurationOptions {
	projectRoot: string
	entryPoint: string | Record<string, string>
	outputDirectory: string

	ignoredDepsBundleDependencies?: string[]
	additionalPlugins?: (devMode: boolean) => Promise<Plugin[]> | Plugin[]

	advanced?: {
		rollup?: [
			{ input?: RollupInputOptions; output?: RollupOutputOptions },
			typeof RollupFn?
		]
		watch?: [RollupWatchOptions, typeof WatchFn?]

		corePluginsAndOptions?: {
			commonJs?: PluginAndOptions<typeof PluginCommonJs>
			nodeResolve?: PluginAndOptions<typeof PluginNodeResolve>
			replace?: { plugin: typeof PluginReplace }
			sucrase?: PluginAndOptions<typeof PluginSucrase>
			typescript?: PluginAndOptions<typeof PluginTypescript>
			terser?: PluginAndOptions<typeof PluginTerser>
		}
	}
}

const configurationSchema = z.object({
	projectRoot: z.string(),
	entryPoint: z.string(),
	outputDirectory: z.string(),

	ignoredDepsBundleDependencies: z.array(z.string()).optional(),
	additionalPlugins: z.function().optional(),

	advanced: z
		.object({
			rollup: z.tuple([
				z
					.object({
						input: z.record(z.unknown()),
						output: z.record(z.unknown()),
					})
					.partial(),
				z.function().optional(),
			]),
			watch: z.tuple([z.record(z.unknown()), z.function().optional()]),

			corePluginsAndOptions: z.object({
				commonJs: pluginAndOptionsSchema,
				nodeResolve: pluginAndOptionsSchema,
				replace: pluginAndOptionsSchema,
				sucrase: pluginAndOptionsSchema,
				typescript: pluginAndOptionsSchema,
				terser: pluginAndOptionsSchema,
			}),
		})
		.deepPartial()
		.optional(),
})

const defaultConfiguration: Partial<ConfigurationOptions> = {
	advanced: {
		rollup: [{}, require('rollup').rollup],
		watch: [{}, require('rollup').watch],

		corePluginsAndOptions: {
			commonJs: { plugin: require('@rollup/plugin-commonjs') },
			nodeResolve: {
				plugin: require('@rollup/plugin-node-resolve').nodeResolve,
				config: {
					common: {
						extensions: ['.mjs', '.js', '.json', '.node', '.ts', '.tsx'],
					},
				},
			},
			replace: { plugin: require('@rollup/plugin-replace') },
			sucrase: { plugin: require('@rollup/plugin-sucrase') },
			typescript: { plugin: require('@rollup/plugin-typescript') },
			terser: { plugin: require('rollup-plugin-terser').terser },
		},
	},
}

/**
 * Parse configuration and fill in defaults
 * @param value - Configuration
 */
export function parseConfiguration(value: ConfigurationOptions) {
	const parsedData = configurationSchema.safeParse(value)

	if (parsedData.success) {
		return defaultsMerge<unknown, Partial<ConfigurationOptions>>(
			parsedData.data,
			defaultConfiguration
		) as ConfigurationOptions
	} else throw parsedData.error
}
