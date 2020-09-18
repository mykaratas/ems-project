import { Application, MixinTarget } from '@loopback/core';
import { LOG_LEVEL } from '../keys';
/**
 * A mixin class for Application that can bind logLevel from `options`.
 * Also provides .logLevel() to bind application wide logLevel.
 * Functions with a log level set to logLevel or higher sill log data
 *
 * @example
 * ```ts
 * class MyApplication extends LogMixin(Application) {}
 * ```
 */
export declare function LogMixin<T extends MixinTarget<Application>>(superClass: T): {
    new (...args: any[]): {
        /**
         * Set minimum logLevel to be displayed.
         *
         * @param level - The log level to set for @log decorator
         *
         * @example
         * ```ts
         * app.logLevel(LOG_LEVEL.INFO);
         * ```
         */
        logLevel(level: LOG_LEVEL): void;
        readonly options: import("@loopback/core").ApplicationConfig;
        readonly state: string;
        controller: <T_1>(controllerCtor: import("@loopback/core").Constructor<T_1>, nameOrOptions?: string | import("@loopback/core").BindingFromClassOptions | undefined) => import("@loopback/core").Binding<T_1>;
        server: <T_2 extends import("@loopback/core").Server>(ctor: import("@loopback/core").Constructor<T_2>, nameOrOptions?: string | import("@loopback/core").BindingFromClassOptions | undefined) => import("@loopback/core").Binding<T_2>;
        servers: <T_3 extends import("@loopback/core").Server>(ctors: import("@loopback/core").Constructor<T_3>[]) => import("@loopback/core").Binding<any>[];
        getServer: <T_4 extends import("@loopback/core").Server>(target: string | import("@loopback/core").Constructor<T_4>) => Promise<T_4>;
        start: () => Promise<void>;
        onStart: (fn: () => import("@loopback/core").ValueOrPromise<void>) => import("@loopback/core").Binding<import("@loopback/core").LifeCycleObserver>;
        stop: () => Promise<void>;
        onStop: (fn: () => import("@loopback/core").ValueOrPromise<void>) => import("@loopback/core").Binding<import("@loopback/core").LifeCycleObserver>;
        component: <T_5 extends import("@loopback/core").Component = import("@loopback/core").Component>(componentCtor: import("@loopback/core").Constructor<T_5>, nameOrOptions?: string | import("@loopback/core").BindingFromClassOptions | undefined) => import("@loopback/core").Binding<T_5>;
        setMetadata: (metadata: import("@loopback/core").ApplicationMetadata) => void;
        lifeCycleObserver: <T_6 extends import("@loopback/core").LifeCycleObserver>(ctor: import("@loopback/core").Constructor<T_6>, nameOrOptions?: string | import("@loopback/core").BindingFromClassOptions | undefined) => import("@loopback/core").Binding<T_6>;
        service: <S>(cls: import("@loopback/core").ServiceOrProviderClass<S>, nameOrOptions?: string | import("@loopback/core").ServiceOptions | undefined) => import("@loopback/core").Binding<S>;
        interceptor: (interceptor: import("@loopback/core").Interceptor | import("@loopback/core").Constructor<import("@loopback/core").Provider<import("@loopback/core").Interceptor>>, nameOrOptions?: string | import("@loopback/core").InterceptorBindingOptions | undefined) => import("@loopback/core").Binding<import("@loopback/core").Interceptor>;
        readonly name: string;
        readonly subscriptionManager: import("@loopback/core").ContextSubscriptionManager;
        readonly parent: import("@loopback/core").Context | undefined;
        emitEvent: <T_7 extends import("@loopback/core").ContextEvent>(type: string, event: T_7) => void;
        emitError: (err: unknown) => void;
        bind: <ValueType = any>(key: import("@loopback/core").BindingAddress<ValueType>) => import("@loopback/core").Binding<ValueType>;
        add: (binding: import("@loopback/core").Binding<unknown>) => Application;
        configure: <ConfigValueType = any>(key?: string | import("@loopback/core").BindingKey<unknown> | undefined) => import("@loopback/core").Binding<ConfigValueType>;
        getConfigAsValueOrPromise: <ConfigValueType_1>(key: import("@loopback/core").BindingAddress<unknown>, propertyPath?: string | undefined, resolutionOptions?: import("@loopback/core").ResolutionOptions | undefined) => import("@loopback/core").ValueOrPromise<ConfigValueType_1 | undefined>;
        getConfig: <ConfigValueType_2>(key: import("@loopback/core").BindingAddress<unknown>, propertyPath?: string | undefined, resolutionOptions?: import("@loopback/core").ResolutionOptions | undefined) => Promise<ConfigValueType_2 | undefined>;
        getConfigSync: <ConfigValueType_3>(key: import("@loopback/core").BindingAddress<unknown>, propertyPath?: string | undefined, resolutionOptions?: import("@loopback/core").ResolutionOptions | undefined) => ConfigValueType_3 | undefined;
        unbind: (key: import("@loopback/core").BindingAddress<unknown>) => boolean;
        subscribe: (observer: import("@loopback/core").ContextEventObserver) => import("@loopback/core").Subscription;
        unsubscribe: (observer: import("@loopback/core").ContextEventObserver) => boolean;
        close: () => void;
        isSubscribed: (observer: import("@loopback/core").ContextObserver) => boolean;
        createView: <T_8 = unknown>(filter: import("@loopback/core").BindingFilter, comparator?: import("@loopback/core").BindingComparator | undefined) => import("@loopback/core").ContextView<T_8>;
        contains: (key: import("@loopback/core").BindingAddress<unknown>) => boolean;
        isBound: (key: import("@loopback/core").BindingAddress<unknown>) => boolean;
        getOwnerContext: (key: import("@loopback/core").BindingAddress<unknown>) => import("@loopback/core").Context | undefined;
        find: <ValueType_1 = any>(pattern?: string | RegExp | import("@loopback/core").BindingFilter | undefined) => Readonly<import("@loopback/core").Binding<ValueType_1>>[];
        findByTag: <ValueType_2 = any>(tagFilter: string | RegExp | Record<string, any>) => Readonly<import("@loopback/core").Binding<ValueType_2>>[];
        get: {
            <ValueType_3>(keyWithPath: import("@loopback/core").BindingAddress<ValueType_3>, session?: import("@loopback/core").ResolutionSession | undefined): Promise<ValueType_3>;
            <ValueType_4>(keyWithPath: import("@loopback/core").BindingAddress<ValueType_4>, options: import("@loopback/core").ResolutionOptions): Promise<ValueType_4 | undefined>;
        };
        getSync: {
            <ValueType_5>(keyWithPath: import("@loopback/core").BindingAddress<ValueType_5>, session?: import("@loopback/core").ResolutionSession | undefined): ValueType_5;
            <ValueType_6>(keyWithPath: import("@loopback/core").BindingAddress<ValueType_6>, options?: import("@loopback/core").ResolutionOptions | undefined): ValueType_6 | undefined;
        };
        getBinding: {
            <ValueType_7 = any>(key: import("@loopback/core").BindingAddress<ValueType_7>): import("@loopback/core").Binding<ValueType_7>;
            <ValueType_8>(key: import("@loopback/core").BindingAddress<ValueType_8>, options?: {
                optional?: boolean | undefined;
            } | undefined): import("@loopback/core").Binding<ValueType_8> | undefined;
        };
        findOrCreateBinding: <T_9>(key: import("@loopback/core").BindingAddress<T_9>, policy?: import("@loopback/core").BindingCreationPolicy | undefined) => import("@loopback/core").Binding<T_9>;
        getValueOrPromise: <ValueType_9>(keyWithPath: import("@loopback/core").BindingAddress<ValueType_9>, optionsOrSession?: import("@loopback/core").ResolutionOptions | import("@loopback/core").ResolutionSession | undefined) => import("@loopback/core").ValueOrPromise<ValueType_9 | undefined>;
        toJSON: () => import("@loopback/core").JSONObject;
        inspect: (options?: import("@loopback/core").ContextInspectOptions | undefined) => import("@loopback/core").JSONObject;
        on: {
            (eventName: "bind" | "unbind", listener: import("@loopback/core").ContextEventListener): Application;
            (event: string | symbol, listener: (...args: any[]) => void): Application;
        };
        once: {
            (eventName: "bind" | "unbind", listener: import("@loopback/core").ContextEventListener): Application;
            (event: string | symbol, listener: (...args: any[]) => void): Application;
        };
        addListener: (event: string | symbol, listener: (...args: any[]) => void) => Application;
        prependListener: (event: string | symbol, listener: (...args: any[]) => void) => Application;
        prependOnceListener: (event: string | symbol, listener: (...args: any[]) => void) => Application;
        removeListener: (event: string | symbol, listener: (...args: any[]) => void) => Application;
        off: (event: string | symbol, listener: (...args: any[]) => void) => Application;
        removeAllListeners: (event?: string | symbol | undefined) => Application;
        setMaxListeners: (n: number) => Application;
        getMaxListeners: () => number;
        listeners: (event: string | symbol) => Function[];
        rawListeners: (event: string | symbol) => Function[];
        emit: (event: string | symbol, ...args: any[]) => boolean;
        eventNames: () => (string | symbol)[];
        listenerCount: (type: string | symbol) => number;
    };
} & T;
