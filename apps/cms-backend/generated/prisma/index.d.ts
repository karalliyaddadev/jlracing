
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model CmsAdmin
 * 
 */
export type CmsAdmin = $Result.DefaultSelection<Prisma.$CmsAdminPayload>
/**
 * Model HeroImage
 * 
 */
export type HeroImage = $Result.DefaultSelection<Prisma.$HeroImagePayload>
/**
 * Model VideoBanner
 * 
 */
export type VideoBanner = $Result.DefaultSelection<Prisma.$VideoBannerPayload>
/**
 * Model GalleryItem
 * 
 */
export type GalleryItem = $Result.DefaultSelection<Prisma.$GalleryItemPayload>
/**
 * Model BlogPost
 * 
 */
export type BlogPost = $Result.DefaultSelection<Prisma.$BlogPostPayload>
/**
 * Model ForeignListing
 * 
 */
export type ForeignListing = $Result.DefaultSelection<Prisma.$ForeignListingPayload>
/**
 * Model FaqCategory
 * 
 */
export type FaqCategory = $Result.DefaultSelection<Prisma.$FaqCategoryPayload>
/**
 * Model FaqItem
 * 
 */
export type FaqItem = $Result.DefaultSelection<Prisma.$FaqItemPayload>
/**
 * Model NewsletterSubscriber
 * 
 */
export type NewsletterSubscriber = $Result.DefaultSelection<Prisma.$NewsletterSubscriberPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const SiteType: {
  LOCAL: 'LOCAL',
  FOREIGN: 'FOREIGN'
};

export type SiteType = (typeof SiteType)[keyof typeof SiteType]

}

export type SiteType = $Enums.SiteType

export const SiteType: typeof $Enums.SiteType

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more CmsAdmins
 * const cmsAdmins = await prisma.cmsAdmin.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more CmsAdmins
   * const cmsAdmins = await prisma.cmsAdmin.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.cmsAdmin`: Exposes CRUD operations for the **CmsAdmin** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CmsAdmins
    * const cmsAdmins = await prisma.cmsAdmin.findMany()
    * ```
    */
  get cmsAdmin(): Prisma.CmsAdminDelegate<ExtArgs>;

  /**
   * `prisma.heroImage`: Exposes CRUD operations for the **HeroImage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more HeroImages
    * const heroImages = await prisma.heroImage.findMany()
    * ```
    */
  get heroImage(): Prisma.HeroImageDelegate<ExtArgs>;

  /**
   * `prisma.videoBanner`: Exposes CRUD operations for the **VideoBanner** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VideoBanners
    * const videoBanners = await prisma.videoBanner.findMany()
    * ```
    */
  get videoBanner(): Prisma.VideoBannerDelegate<ExtArgs>;

  /**
   * `prisma.galleryItem`: Exposes CRUD operations for the **GalleryItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GalleryItems
    * const galleryItems = await prisma.galleryItem.findMany()
    * ```
    */
  get galleryItem(): Prisma.GalleryItemDelegate<ExtArgs>;

  /**
   * `prisma.blogPost`: Exposes CRUD operations for the **BlogPost** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BlogPosts
    * const blogPosts = await prisma.blogPost.findMany()
    * ```
    */
  get blogPost(): Prisma.BlogPostDelegate<ExtArgs>;

  /**
   * `prisma.foreignListing`: Exposes CRUD operations for the **ForeignListing** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ForeignListings
    * const foreignListings = await prisma.foreignListing.findMany()
    * ```
    */
  get foreignListing(): Prisma.ForeignListingDelegate<ExtArgs>;

  /**
   * `prisma.faqCategory`: Exposes CRUD operations for the **FaqCategory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FaqCategories
    * const faqCategories = await prisma.faqCategory.findMany()
    * ```
    */
  get faqCategory(): Prisma.FaqCategoryDelegate<ExtArgs>;

  /**
   * `prisma.faqItem`: Exposes CRUD operations for the **FaqItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FaqItems
    * const faqItems = await prisma.faqItem.findMany()
    * ```
    */
  get faqItem(): Prisma.FaqItemDelegate<ExtArgs>;

  /**
   * `prisma.newsletterSubscriber`: Exposes CRUD operations for the **NewsletterSubscriber** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more NewsletterSubscribers
    * const newsletterSubscribers = await prisma.newsletterSubscriber.findMany()
    * ```
    */
  get newsletterSubscriber(): Prisma.NewsletterSubscriberDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    CmsAdmin: 'CmsAdmin',
    HeroImage: 'HeroImage',
    VideoBanner: 'VideoBanner',
    GalleryItem: 'GalleryItem',
    BlogPost: 'BlogPost',
    ForeignListing: 'ForeignListing',
    FaqCategory: 'FaqCategory',
    FaqItem: 'FaqItem',
    NewsletterSubscriber: 'NewsletterSubscriber'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "cmsAdmin" | "heroImage" | "videoBanner" | "galleryItem" | "blogPost" | "foreignListing" | "faqCategory" | "faqItem" | "newsletterSubscriber"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      CmsAdmin: {
        payload: Prisma.$CmsAdminPayload<ExtArgs>
        fields: Prisma.CmsAdminFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CmsAdminFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CmsAdminPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CmsAdminFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CmsAdminPayload>
          }
          findFirst: {
            args: Prisma.CmsAdminFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CmsAdminPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CmsAdminFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CmsAdminPayload>
          }
          findMany: {
            args: Prisma.CmsAdminFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CmsAdminPayload>[]
          }
          create: {
            args: Prisma.CmsAdminCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CmsAdminPayload>
          }
          createMany: {
            args: Prisma.CmsAdminCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CmsAdminCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CmsAdminPayload>[]
          }
          delete: {
            args: Prisma.CmsAdminDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CmsAdminPayload>
          }
          update: {
            args: Prisma.CmsAdminUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CmsAdminPayload>
          }
          deleteMany: {
            args: Prisma.CmsAdminDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CmsAdminUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CmsAdminUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CmsAdminPayload>
          }
          aggregate: {
            args: Prisma.CmsAdminAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCmsAdmin>
          }
          groupBy: {
            args: Prisma.CmsAdminGroupByArgs<ExtArgs>
            result: $Utils.Optional<CmsAdminGroupByOutputType>[]
          }
          count: {
            args: Prisma.CmsAdminCountArgs<ExtArgs>
            result: $Utils.Optional<CmsAdminCountAggregateOutputType> | number
          }
        }
      }
      HeroImage: {
        payload: Prisma.$HeroImagePayload<ExtArgs>
        fields: Prisma.HeroImageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HeroImageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HeroImagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HeroImageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HeroImagePayload>
          }
          findFirst: {
            args: Prisma.HeroImageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HeroImagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HeroImageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HeroImagePayload>
          }
          findMany: {
            args: Prisma.HeroImageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HeroImagePayload>[]
          }
          create: {
            args: Prisma.HeroImageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HeroImagePayload>
          }
          createMany: {
            args: Prisma.HeroImageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.HeroImageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HeroImagePayload>[]
          }
          delete: {
            args: Prisma.HeroImageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HeroImagePayload>
          }
          update: {
            args: Prisma.HeroImageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HeroImagePayload>
          }
          deleteMany: {
            args: Prisma.HeroImageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HeroImageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.HeroImageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HeroImagePayload>
          }
          aggregate: {
            args: Prisma.HeroImageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHeroImage>
          }
          groupBy: {
            args: Prisma.HeroImageGroupByArgs<ExtArgs>
            result: $Utils.Optional<HeroImageGroupByOutputType>[]
          }
          count: {
            args: Prisma.HeroImageCountArgs<ExtArgs>
            result: $Utils.Optional<HeroImageCountAggregateOutputType> | number
          }
        }
      }
      VideoBanner: {
        payload: Prisma.$VideoBannerPayload<ExtArgs>
        fields: Prisma.VideoBannerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VideoBannerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoBannerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VideoBannerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoBannerPayload>
          }
          findFirst: {
            args: Prisma.VideoBannerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoBannerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VideoBannerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoBannerPayload>
          }
          findMany: {
            args: Prisma.VideoBannerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoBannerPayload>[]
          }
          create: {
            args: Prisma.VideoBannerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoBannerPayload>
          }
          createMany: {
            args: Prisma.VideoBannerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VideoBannerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoBannerPayload>[]
          }
          delete: {
            args: Prisma.VideoBannerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoBannerPayload>
          }
          update: {
            args: Prisma.VideoBannerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoBannerPayload>
          }
          deleteMany: {
            args: Prisma.VideoBannerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VideoBannerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.VideoBannerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoBannerPayload>
          }
          aggregate: {
            args: Prisma.VideoBannerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVideoBanner>
          }
          groupBy: {
            args: Prisma.VideoBannerGroupByArgs<ExtArgs>
            result: $Utils.Optional<VideoBannerGroupByOutputType>[]
          }
          count: {
            args: Prisma.VideoBannerCountArgs<ExtArgs>
            result: $Utils.Optional<VideoBannerCountAggregateOutputType> | number
          }
        }
      }
      GalleryItem: {
        payload: Prisma.$GalleryItemPayload<ExtArgs>
        fields: Prisma.GalleryItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GalleryItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GalleryItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GalleryItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GalleryItemPayload>
          }
          findFirst: {
            args: Prisma.GalleryItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GalleryItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GalleryItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GalleryItemPayload>
          }
          findMany: {
            args: Prisma.GalleryItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GalleryItemPayload>[]
          }
          create: {
            args: Prisma.GalleryItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GalleryItemPayload>
          }
          createMany: {
            args: Prisma.GalleryItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GalleryItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GalleryItemPayload>[]
          }
          delete: {
            args: Prisma.GalleryItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GalleryItemPayload>
          }
          update: {
            args: Prisma.GalleryItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GalleryItemPayload>
          }
          deleteMany: {
            args: Prisma.GalleryItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GalleryItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.GalleryItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GalleryItemPayload>
          }
          aggregate: {
            args: Prisma.GalleryItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGalleryItem>
          }
          groupBy: {
            args: Prisma.GalleryItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<GalleryItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.GalleryItemCountArgs<ExtArgs>
            result: $Utils.Optional<GalleryItemCountAggregateOutputType> | number
          }
        }
      }
      BlogPost: {
        payload: Prisma.$BlogPostPayload<ExtArgs>
        fields: Prisma.BlogPostFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BlogPostFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BlogPostFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostPayload>
          }
          findFirst: {
            args: Prisma.BlogPostFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BlogPostFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostPayload>
          }
          findMany: {
            args: Prisma.BlogPostFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostPayload>[]
          }
          create: {
            args: Prisma.BlogPostCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostPayload>
          }
          createMany: {
            args: Prisma.BlogPostCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BlogPostCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostPayload>[]
          }
          delete: {
            args: Prisma.BlogPostDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostPayload>
          }
          update: {
            args: Prisma.BlogPostUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostPayload>
          }
          deleteMany: {
            args: Prisma.BlogPostDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BlogPostUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BlogPostUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostPayload>
          }
          aggregate: {
            args: Prisma.BlogPostAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBlogPost>
          }
          groupBy: {
            args: Prisma.BlogPostGroupByArgs<ExtArgs>
            result: $Utils.Optional<BlogPostGroupByOutputType>[]
          }
          count: {
            args: Prisma.BlogPostCountArgs<ExtArgs>
            result: $Utils.Optional<BlogPostCountAggregateOutputType> | number
          }
        }
      }
      ForeignListing: {
        payload: Prisma.$ForeignListingPayload<ExtArgs>
        fields: Prisma.ForeignListingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ForeignListingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForeignListingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ForeignListingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForeignListingPayload>
          }
          findFirst: {
            args: Prisma.ForeignListingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForeignListingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ForeignListingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForeignListingPayload>
          }
          findMany: {
            args: Prisma.ForeignListingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForeignListingPayload>[]
          }
          create: {
            args: Prisma.ForeignListingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForeignListingPayload>
          }
          createMany: {
            args: Prisma.ForeignListingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ForeignListingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForeignListingPayload>[]
          }
          delete: {
            args: Prisma.ForeignListingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForeignListingPayload>
          }
          update: {
            args: Prisma.ForeignListingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForeignListingPayload>
          }
          deleteMany: {
            args: Prisma.ForeignListingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ForeignListingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ForeignListingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForeignListingPayload>
          }
          aggregate: {
            args: Prisma.ForeignListingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateForeignListing>
          }
          groupBy: {
            args: Prisma.ForeignListingGroupByArgs<ExtArgs>
            result: $Utils.Optional<ForeignListingGroupByOutputType>[]
          }
          count: {
            args: Prisma.ForeignListingCountArgs<ExtArgs>
            result: $Utils.Optional<ForeignListingCountAggregateOutputType> | number
          }
        }
      }
      FaqCategory: {
        payload: Prisma.$FaqCategoryPayload<ExtArgs>
        fields: Prisma.FaqCategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FaqCategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FaqCategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FaqCategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FaqCategoryPayload>
          }
          findFirst: {
            args: Prisma.FaqCategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FaqCategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FaqCategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FaqCategoryPayload>
          }
          findMany: {
            args: Prisma.FaqCategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FaqCategoryPayload>[]
          }
          create: {
            args: Prisma.FaqCategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FaqCategoryPayload>
          }
          createMany: {
            args: Prisma.FaqCategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FaqCategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FaqCategoryPayload>[]
          }
          delete: {
            args: Prisma.FaqCategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FaqCategoryPayload>
          }
          update: {
            args: Prisma.FaqCategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FaqCategoryPayload>
          }
          deleteMany: {
            args: Prisma.FaqCategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FaqCategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.FaqCategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FaqCategoryPayload>
          }
          aggregate: {
            args: Prisma.FaqCategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFaqCategory>
          }
          groupBy: {
            args: Prisma.FaqCategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<FaqCategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.FaqCategoryCountArgs<ExtArgs>
            result: $Utils.Optional<FaqCategoryCountAggregateOutputType> | number
          }
        }
      }
      FaqItem: {
        payload: Prisma.$FaqItemPayload<ExtArgs>
        fields: Prisma.FaqItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FaqItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FaqItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FaqItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FaqItemPayload>
          }
          findFirst: {
            args: Prisma.FaqItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FaqItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FaqItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FaqItemPayload>
          }
          findMany: {
            args: Prisma.FaqItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FaqItemPayload>[]
          }
          create: {
            args: Prisma.FaqItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FaqItemPayload>
          }
          createMany: {
            args: Prisma.FaqItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FaqItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FaqItemPayload>[]
          }
          delete: {
            args: Prisma.FaqItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FaqItemPayload>
          }
          update: {
            args: Prisma.FaqItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FaqItemPayload>
          }
          deleteMany: {
            args: Prisma.FaqItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FaqItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.FaqItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FaqItemPayload>
          }
          aggregate: {
            args: Prisma.FaqItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFaqItem>
          }
          groupBy: {
            args: Prisma.FaqItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<FaqItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.FaqItemCountArgs<ExtArgs>
            result: $Utils.Optional<FaqItemCountAggregateOutputType> | number
          }
        }
      }
      NewsletterSubscriber: {
        payload: Prisma.$NewsletterSubscriberPayload<ExtArgs>
        fields: Prisma.NewsletterSubscriberFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NewsletterSubscriberFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterSubscriberPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NewsletterSubscriberFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterSubscriberPayload>
          }
          findFirst: {
            args: Prisma.NewsletterSubscriberFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterSubscriberPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NewsletterSubscriberFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterSubscriberPayload>
          }
          findMany: {
            args: Prisma.NewsletterSubscriberFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterSubscriberPayload>[]
          }
          create: {
            args: Prisma.NewsletterSubscriberCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterSubscriberPayload>
          }
          createMany: {
            args: Prisma.NewsletterSubscriberCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NewsletterSubscriberCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterSubscriberPayload>[]
          }
          delete: {
            args: Prisma.NewsletterSubscriberDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterSubscriberPayload>
          }
          update: {
            args: Prisma.NewsletterSubscriberUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterSubscriberPayload>
          }
          deleteMany: {
            args: Prisma.NewsletterSubscriberDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NewsletterSubscriberUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.NewsletterSubscriberUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterSubscriberPayload>
          }
          aggregate: {
            args: Prisma.NewsletterSubscriberAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNewsletterSubscriber>
          }
          groupBy: {
            args: Prisma.NewsletterSubscriberGroupByArgs<ExtArgs>
            result: $Utils.Optional<NewsletterSubscriberGroupByOutputType>[]
          }
          count: {
            args: Prisma.NewsletterSubscriberCountArgs<ExtArgs>
            result: $Utils.Optional<NewsletterSubscriberCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type FaqCategoryCountOutputType
   */

  export type FaqCategoryCountOutputType = {
    items: number
  }

  export type FaqCategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | FaqCategoryCountOutputTypeCountItemsArgs
  }

  // Custom InputTypes
  /**
   * FaqCategoryCountOutputType without action
   */
  export type FaqCategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FaqCategoryCountOutputType
     */
    select?: FaqCategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FaqCategoryCountOutputType without action
   */
  export type FaqCategoryCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FaqItemWhereInput
  }


  /**
   * Models
   */

  /**
   * Model CmsAdmin
   */

  export type AggregateCmsAdmin = {
    _count: CmsAdminCountAggregateOutputType | null
    _avg: CmsAdminAvgAggregateOutputType | null
    _sum: CmsAdminSumAggregateOutputType | null
    _min: CmsAdminMinAggregateOutputType | null
    _max: CmsAdminMaxAggregateOutputType | null
  }

  export type CmsAdminAvgAggregateOutputType = {
    id: number | null
  }

  export type CmsAdminSumAggregateOutputType = {
    id: number | null
  }

  export type CmsAdminMinAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    passwordHash: string | null
    isActive: boolean | null
    lastLoginAt: Date | null
    refreshTokenHash: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CmsAdminMaxAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    passwordHash: string | null
    isActive: boolean | null
    lastLoginAt: Date | null
    refreshTokenHash: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CmsAdminCountAggregateOutputType = {
    id: number
    name: number
    email: number
    passwordHash: number
    isActive: number
    lastLoginAt: number
    refreshTokenHash: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CmsAdminAvgAggregateInputType = {
    id?: true
  }

  export type CmsAdminSumAggregateInputType = {
    id?: true
  }

  export type CmsAdminMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    passwordHash?: true
    isActive?: true
    lastLoginAt?: true
    refreshTokenHash?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CmsAdminMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    passwordHash?: true
    isActive?: true
    lastLoginAt?: true
    refreshTokenHash?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CmsAdminCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    passwordHash?: true
    isActive?: true
    lastLoginAt?: true
    refreshTokenHash?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CmsAdminAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CmsAdmin to aggregate.
     */
    where?: CmsAdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CmsAdmins to fetch.
     */
    orderBy?: CmsAdminOrderByWithRelationInput | CmsAdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CmsAdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CmsAdmins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CmsAdmins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CmsAdmins
    **/
    _count?: true | CmsAdminCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CmsAdminAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CmsAdminSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CmsAdminMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CmsAdminMaxAggregateInputType
  }

  export type GetCmsAdminAggregateType<T extends CmsAdminAggregateArgs> = {
        [P in keyof T & keyof AggregateCmsAdmin]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCmsAdmin[P]>
      : GetScalarType<T[P], AggregateCmsAdmin[P]>
  }




  export type CmsAdminGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CmsAdminWhereInput
    orderBy?: CmsAdminOrderByWithAggregationInput | CmsAdminOrderByWithAggregationInput[]
    by: CmsAdminScalarFieldEnum[] | CmsAdminScalarFieldEnum
    having?: CmsAdminScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CmsAdminCountAggregateInputType | true
    _avg?: CmsAdminAvgAggregateInputType
    _sum?: CmsAdminSumAggregateInputType
    _min?: CmsAdminMinAggregateInputType
    _max?: CmsAdminMaxAggregateInputType
  }

  export type CmsAdminGroupByOutputType = {
    id: number
    name: string
    email: string
    passwordHash: string
    isActive: boolean
    lastLoginAt: Date | null
    refreshTokenHash: string | null
    createdAt: Date
    updatedAt: Date
    _count: CmsAdminCountAggregateOutputType | null
    _avg: CmsAdminAvgAggregateOutputType | null
    _sum: CmsAdminSumAggregateOutputType | null
    _min: CmsAdminMinAggregateOutputType | null
    _max: CmsAdminMaxAggregateOutputType | null
  }

  type GetCmsAdminGroupByPayload<T extends CmsAdminGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CmsAdminGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CmsAdminGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CmsAdminGroupByOutputType[P]>
            : GetScalarType<T[P], CmsAdminGroupByOutputType[P]>
        }
      >
    >


  export type CmsAdminSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    isActive?: boolean
    lastLoginAt?: boolean
    refreshTokenHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["cmsAdmin"]>

  export type CmsAdminSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    isActive?: boolean
    lastLoginAt?: boolean
    refreshTokenHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["cmsAdmin"]>

  export type CmsAdminSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    isActive?: boolean
    lastLoginAt?: boolean
    refreshTokenHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $CmsAdminPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CmsAdmin"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      email: string
      passwordHash: string
      isActive: boolean
      lastLoginAt: Date | null
      refreshTokenHash: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["cmsAdmin"]>
    composites: {}
  }

  type CmsAdminGetPayload<S extends boolean | null | undefined | CmsAdminDefaultArgs> = $Result.GetResult<Prisma.$CmsAdminPayload, S>

  type CmsAdminCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CmsAdminFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CmsAdminCountAggregateInputType | true
    }

  export interface CmsAdminDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CmsAdmin'], meta: { name: 'CmsAdmin' } }
    /**
     * Find zero or one CmsAdmin that matches the filter.
     * @param {CmsAdminFindUniqueArgs} args - Arguments to find a CmsAdmin
     * @example
     * // Get one CmsAdmin
     * const cmsAdmin = await prisma.cmsAdmin.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CmsAdminFindUniqueArgs>(args: SelectSubset<T, CmsAdminFindUniqueArgs<ExtArgs>>): Prisma__CmsAdminClient<$Result.GetResult<Prisma.$CmsAdminPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one CmsAdmin that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CmsAdminFindUniqueOrThrowArgs} args - Arguments to find a CmsAdmin
     * @example
     * // Get one CmsAdmin
     * const cmsAdmin = await prisma.cmsAdmin.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CmsAdminFindUniqueOrThrowArgs>(args: SelectSubset<T, CmsAdminFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CmsAdminClient<$Result.GetResult<Prisma.$CmsAdminPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first CmsAdmin that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CmsAdminFindFirstArgs} args - Arguments to find a CmsAdmin
     * @example
     * // Get one CmsAdmin
     * const cmsAdmin = await prisma.cmsAdmin.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CmsAdminFindFirstArgs>(args?: SelectSubset<T, CmsAdminFindFirstArgs<ExtArgs>>): Prisma__CmsAdminClient<$Result.GetResult<Prisma.$CmsAdminPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first CmsAdmin that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CmsAdminFindFirstOrThrowArgs} args - Arguments to find a CmsAdmin
     * @example
     * // Get one CmsAdmin
     * const cmsAdmin = await prisma.cmsAdmin.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CmsAdminFindFirstOrThrowArgs>(args?: SelectSubset<T, CmsAdminFindFirstOrThrowArgs<ExtArgs>>): Prisma__CmsAdminClient<$Result.GetResult<Prisma.$CmsAdminPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more CmsAdmins that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CmsAdminFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CmsAdmins
     * const cmsAdmins = await prisma.cmsAdmin.findMany()
     * 
     * // Get first 10 CmsAdmins
     * const cmsAdmins = await prisma.cmsAdmin.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cmsAdminWithIdOnly = await prisma.cmsAdmin.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CmsAdminFindManyArgs>(args?: SelectSubset<T, CmsAdminFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CmsAdminPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a CmsAdmin.
     * @param {CmsAdminCreateArgs} args - Arguments to create a CmsAdmin.
     * @example
     * // Create one CmsAdmin
     * const CmsAdmin = await prisma.cmsAdmin.create({
     *   data: {
     *     // ... data to create a CmsAdmin
     *   }
     * })
     * 
     */
    create<T extends CmsAdminCreateArgs>(args: SelectSubset<T, CmsAdminCreateArgs<ExtArgs>>): Prisma__CmsAdminClient<$Result.GetResult<Prisma.$CmsAdminPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many CmsAdmins.
     * @param {CmsAdminCreateManyArgs} args - Arguments to create many CmsAdmins.
     * @example
     * // Create many CmsAdmins
     * const cmsAdmin = await prisma.cmsAdmin.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CmsAdminCreateManyArgs>(args?: SelectSubset<T, CmsAdminCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CmsAdmins and returns the data saved in the database.
     * @param {CmsAdminCreateManyAndReturnArgs} args - Arguments to create many CmsAdmins.
     * @example
     * // Create many CmsAdmins
     * const cmsAdmin = await prisma.cmsAdmin.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CmsAdmins and only return the `id`
     * const cmsAdminWithIdOnly = await prisma.cmsAdmin.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CmsAdminCreateManyAndReturnArgs>(args?: SelectSubset<T, CmsAdminCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CmsAdminPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a CmsAdmin.
     * @param {CmsAdminDeleteArgs} args - Arguments to delete one CmsAdmin.
     * @example
     * // Delete one CmsAdmin
     * const CmsAdmin = await prisma.cmsAdmin.delete({
     *   where: {
     *     // ... filter to delete one CmsAdmin
     *   }
     * })
     * 
     */
    delete<T extends CmsAdminDeleteArgs>(args: SelectSubset<T, CmsAdminDeleteArgs<ExtArgs>>): Prisma__CmsAdminClient<$Result.GetResult<Prisma.$CmsAdminPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one CmsAdmin.
     * @param {CmsAdminUpdateArgs} args - Arguments to update one CmsAdmin.
     * @example
     * // Update one CmsAdmin
     * const cmsAdmin = await prisma.cmsAdmin.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CmsAdminUpdateArgs>(args: SelectSubset<T, CmsAdminUpdateArgs<ExtArgs>>): Prisma__CmsAdminClient<$Result.GetResult<Prisma.$CmsAdminPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more CmsAdmins.
     * @param {CmsAdminDeleteManyArgs} args - Arguments to filter CmsAdmins to delete.
     * @example
     * // Delete a few CmsAdmins
     * const { count } = await prisma.cmsAdmin.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CmsAdminDeleteManyArgs>(args?: SelectSubset<T, CmsAdminDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CmsAdmins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CmsAdminUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CmsAdmins
     * const cmsAdmin = await prisma.cmsAdmin.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CmsAdminUpdateManyArgs>(args: SelectSubset<T, CmsAdminUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CmsAdmin.
     * @param {CmsAdminUpsertArgs} args - Arguments to update or create a CmsAdmin.
     * @example
     * // Update or create a CmsAdmin
     * const cmsAdmin = await prisma.cmsAdmin.upsert({
     *   create: {
     *     // ... data to create a CmsAdmin
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CmsAdmin we want to update
     *   }
     * })
     */
    upsert<T extends CmsAdminUpsertArgs>(args: SelectSubset<T, CmsAdminUpsertArgs<ExtArgs>>): Prisma__CmsAdminClient<$Result.GetResult<Prisma.$CmsAdminPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of CmsAdmins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CmsAdminCountArgs} args - Arguments to filter CmsAdmins to count.
     * @example
     * // Count the number of CmsAdmins
     * const count = await prisma.cmsAdmin.count({
     *   where: {
     *     // ... the filter for the CmsAdmins we want to count
     *   }
     * })
    **/
    count<T extends CmsAdminCountArgs>(
      args?: Subset<T, CmsAdminCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CmsAdminCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CmsAdmin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CmsAdminAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CmsAdminAggregateArgs>(args: Subset<T, CmsAdminAggregateArgs>): Prisma.PrismaPromise<GetCmsAdminAggregateType<T>>

    /**
     * Group by CmsAdmin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CmsAdminGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CmsAdminGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CmsAdminGroupByArgs['orderBy'] }
        : { orderBy?: CmsAdminGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CmsAdminGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCmsAdminGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CmsAdmin model
   */
  readonly fields: CmsAdminFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CmsAdmin.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CmsAdminClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CmsAdmin model
   */ 
  interface CmsAdminFieldRefs {
    readonly id: FieldRef<"CmsAdmin", 'Int'>
    readonly name: FieldRef<"CmsAdmin", 'String'>
    readonly email: FieldRef<"CmsAdmin", 'String'>
    readonly passwordHash: FieldRef<"CmsAdmin", 'String'>
    readonly isActive: FieldRef<"CmsAdmin", 'Boolean'>
    readonly lastLoginAt: FieldRef<"CmsAdmin", 'DateTime'>
    readonly refreshTokenHash: FieldRef<"CmsAdmin", 'String'>
    readonly createdAt: FieldRef<"CmsAdmin", 'DateTime'>
    readonly updatedAt: FieldRef<"CmsAdmin", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CmsAdmin findUnique
   */
  export type CmsAdminFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CmsAdmin
     */
    select?: CmsAdminSelect<ExtArgs> | null
    /**
     * Filter, which CmsAdmin to fetch.
     */
    where: CmsAdminWhereUniqueInput
  }

  /**
   * CmsAdmin findUniqueOrThrow
   */
  export type CmsAdminFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CmsAdmin
     */
    select?: CmsAdminSelect<ExtArgs> | null
    /**
     * Filter, which CmsAdmin to fetch.
     */
    where: CmsAdminWhereUniqueInput
  }

  /**
   * CmsAdmin findFirst
   */
  export type CmsAdminFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CmsAdmin
     */
    select?: CmsAdminSelect<ExtArgs> | null
    /**
     * Filter, which CmsAdmin to fetch.
     */
    where?: CmsAdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CmsAdmins to fetch.
     */
    orderBy?: CmsAdminOrderByWithRelationInput | CmsAdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CmsAdmins.
     */
    cursor?: CmsAdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CmsAdmins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CmsAdmins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CmsAdmins.
     */
    distinct?: CmsAdminScalarFieldEnum | CmsAdminScalarFieldEnum[]
  }

  /**
   * CmsAdmin findFirstOrThrow
   */
  export type CmsAdminFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CmsAdmin
     */
    select?: CmsAdminSelect<ExtArgs> | null
    /**
     * Filter, which CmsAdmin to fetch.
     */
    where?: CmsAdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CmsAdmins to fetch.
     */
    orderBy?: CmsAdminOrderByWithRelationInput | CmsAdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CmsAdmins.
     */
    cursor?: CmsAdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CmsAdmins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CmsAdmins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CmsAdmins.
     */
    distinct?: CmsAdminScalarFieldEnum | CmsAdminScalarFieldEnum[]
  }

  /**
   * CmsAdmin findMany
   */
  export type CmsAdminFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CmsAdmin
     */
    select?: CmsAdminSelect<ExtArgs> | null
    /**
     * Filter, which CmsAdmins to fetch.
     */
    where?: CmsAdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CmsAdmins to fetch.
     */
    orderBy?: CmsAdminOrderByWithRelationInput | CmsAdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CmsAdmins.
     */
    cursor?: CmsAdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CmsAdmins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CmsAdmins.
     */
    skip?: number
    distinct?: CmsAdminScalarFieldEnum | CmsAdminScalarFieldEnum[]
  }

  /**
   * CmsAdmin create
   */
  export type CmsAdminCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CmsAdmin
     */
    select?: CmsAdminSelect<ExtArgs> | null
    /**
     * The data needed to create a CmsAdmin.
     */
    data: XOR<CmsAdminCreateInput, CmsAdminUncheckedCreateInput>
  }

  /**
   * CmsAdmin createMany
   */
  export type CmsAdminCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CmsAdmins.
     */
    data: CmsAdminCreateManyInput | CmsAdminCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CmsAdmin createManyAndReturn
   */
  export type CmsAdminCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CmsAdmin
     */
    select?: CmsAdminSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many CmsAdmins.
     */
    data: CmsAdminCreateManyInput | CmsAdminCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CmsAdmin update
   */
  export type CmsAdminUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CmsAdmin
     */
    select?: CmsAdminSelect<ExtArgs> | null
    /**
     * The data needed to update a CmsAdmin.
     */
    data: XOR<CmsAdminUpdateInput, CmsAdminUncheckedUpdateInput>
    /**
     * Choose, which CmsAdmin to update.
     */
    where: CmsAdminWhereUniqueInput
  }

  /**
   * CmsAdmin updateMany
   */
  export type CmsAdminUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CmsAdmins.
     */
    data: XOR<CmsAdminUpdateManyMutationInput, CmsAdminUncheckedUpdateManyInput>
    /**
     * Filter which CmsAdmins to update
     */
    where?: CmsAdminWhereInput
  }

  /**
   * CmsAdmin upsert
   */
  export type CmsAdminUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CmsAdmin
     */
    select?: CmsAdminSelect<ExtArgs> | null
    /**
     * The filter to search for the CmsAdmin to update in case it exists.
     */
    where: CmsAdminWhereUniqueInput
    /**
     * In case the CmsAdmin found by the `where` argument doesn't exist, create a new CmsAdmin with this data.
     */
    create: XOR<CmsAdminCreateInput, CmsAdminUncheckedCreateInput>
    /**
     * In case the CmsAdmin was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CmsAdminUpdateInput, CmsAdminUncheckedUpdateInput>
  }

  /**
   * CmsAdmin delete
   */
  export type CmsAdminDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CmsAdmin
     */
    select?: CmsAdminSelect<ExtArgs> | null
    /**
     * Filter which CmsAdmin to delete.
     */
    where: CmsAdminWhereUniqueInput
  }

  /**
   * CmsAdmin deleteMany
   */
  export type CmsAdminDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CmsAdmins to delete
     */
    where?: CmsAdminWhereInput
  }

  /**
   * CmsAdmin without action
   */
  export type CmsAdminDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CmsAdmin
     */
    select?: CmsAdminSelect<ExtArgs> | null
  }


  /**
   * Model HeroImage
   */

  export type AggregateHeroImage = {
    _count: HeroImageCountAggregateOutputType | null
    _avg: HeroImageAvgAggregateOutputType | null
    _sum: HeroImageSumAggregateOutputType | null
    _min: HeroImageMinAggregateOutputType | null
    _max: HeroImageMaxAggregateOutputType | null
  }

  export type HeroImageAvgAggregateOutputType = {
    id: number | null
    order: number | null
  }

  export type HeroImageSumAggregateOutputType = {
    id: number | null
    order: number | null
  }

  export type HeroImageMinAggregateOutputType = {
    id: number | null
    site: $Enums.SiteType | null
    desktopImage: string | null
    mobileImage: string | null
    buttonLink: string | null
    order: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type HeroImageMaxAggregateOutputType = {
    id: number | null
    site: $Enums.SiteType | null
    desktopImage: string | null
    mobileImage: string | null
    buttonLink: string | null
    order: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type HeroImageCountAggregateOutputType = {
    id: number
    site: number
    desktopImage: number
    mobileImage: number
    buttonLink: number
    order: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type HeroImageAvgAggregateInputType = {
    id?: true
    order?: true
  }

  export type HeroImageSumAggregateInputType = {
    id?: true
    order?: true
  }

  export type HeroImageMinAggregateInputType = {
    id?: true
    site?: true
    desktopImage?: true
    mobileImage?: true
    buttonLink?: true
    order?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type HeroImageMaxAggregateInputType = {
    id?: true
    site?: true
    desktopImage?: true
    mobileImage?: true
    buttonLink?: true
    order?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type HeroImageCountAggregateInputType = {
    id?: true
    site?: true
    desktopImage?: true
    mobileImage?: true
    buttonLink?: true
    order?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type HeroImageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HeroImage to aggregate.
     */
    where?: HeroImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HeroImages to fetch.
     */
    orderBy?: HeroImageOrderByWithRelationInput | HeroImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HeroImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HeroImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HeroImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned HeroImages
    **/
    _count?: true | HeroImageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: HeroImageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: HeroImageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HeroImageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HeroImageMaxAggregateInputType
  }

  export type GetHeroImageAggregateType<T extends HeroImageAggregateArgs> = {
        [P in keyof T & keyof AggregateHeroImage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHeroImage[P]>
      : GetScalarType<T[P], AggregateHeroImage[P]>
  }




  export type HeroImageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HeroImageWhereInput
    orderBy?: HeroImageOrderByWithAggregationInput | HeroImageOrderByWithAggregationInput[]
    by: HeroImageScalarFieldEnum[] | HeroImageScalarFieldEnum
    having?: HeroImageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HeroImageCountAggregateInputType | true
    _avg?: HeroImageAvgAggregateInputType
    _sum?: HeroImageSumAggregateInputType
    _min?: HeroImageMinAggregateInputType
    _max?: HeroImageMaxAggregateInputType
  }

  export type HeroImageGroupByOutputType = {
    id: number
    site: $Enums.SiteType
    desktopImage: string
    mobileImage: string
    buttonLink: string
    order: number
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: HeroImageCountAggregateOutputType | null
    _avg: HeroImageAvgAggregateOutputType | null
    _sum: HeroImageSumAggregateOutputType | null
    _min: HeroImageMinAggregateOutputType | null
    _max: HeroImageMaxAggregateOutputType | null
  }

  type GetHeroImageGroupByPayload<T extends HeroImageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HeroImageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HeroImageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HeroImageGroupByOutputType[P]>
            : GetScalarType<T[P], HeroImageGroupByOutputType[P]>
        }
      >
    >


  export type HeroImageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    site?: boolean
    desktopImage?: boolean
    mobileImage?: boolean
    buttonLink?: boolean
    order?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["heroImage"]>

  export type HeroImageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    site?: boolean
    desktopImage?: boolean
    mobileImage?: boolean
    buttonLink?: boolean
    order?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["heroImage"]>

  export type HeroImageSelectScalar = {
    id?: boolean
    site?: boolean
    desktopImage?: boolean
    mobileImage?: boolean
    buttonLink?: boolean
    order?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $HeroImagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "HeroImage"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      site: $Enums.SiteType
      desktopImage: string
      mobileImage: string
      buttonLink: string
      order: number
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["heroImage"]>
    composites: {}
  }

  type HeroImageGetPayload<S extends boolean | null | undefined | HeroImageDefaultArgs> = $Result.GetResult<Prisma.$HeroImagePayload, S>

  type HeroImageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<HeroImageFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: HeroImageCountAggregateInputType | true
    }

  export interface HeroImageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['HeroImage'], meta: { name: 'HeroImage' } }
    /**
     * Find zero or one HeroImage that matches the filter.
     * @param {HeroImageFindUniqueArgs} args - Arguments to find a HeroImage
     * @example
     * // Get one HeroImage
     * const heroImage = await prisma.heroImage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HeroImageFindUniqueArgs>(args: SelectSubset<T, HeroImageFindUniqueArgs<ExtArgs>>): Prisma__HeroImageClient<$Result.GetResult<Prisma.$HeroImagePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one HeroImage that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {HeroImageFindUniqueOrThrowArgs} args - Arguments to find a HeroImage
     * @example
     * // Get one HeroImage
     * const heroImage = await prisma.heroImage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HeroImageFindUniqueOrThrowArgs>(args: SelectSubset<T, HeroImageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HeroImageClient<$Result.GetResult<Prisma.$HeroImagePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first HeroImage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HeroImageFindFirstArgs} args - Arguments to find a HeroImage
     * @example
     * // Get one HeroImage
     * const heroImage = await prisma.heroImage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HeroImageFindFirstArgs>(args?: SelectSubset<T, HeroImageFindFirstArgs<ExtArgs>>): Prisma__HeroImageClient<$Result.GetResult<Prisma.$HeroImagePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first HeroImage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HeroImageFindFirstOrThrowArgs} args - Arguments to find a HeroImage
     * @example
     * // Get one HeroImage
     * const heroImage = await prisma.heroImage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HeroImageFindFirstOrThrowArgs>(args?: SelectSubset<T, HeroImageFindFirstOrThrowArgs<ExtArgs>>): Prisma__HeroImageClient<$Result.GetResult<Prisma.$HeroImagePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more HeroImages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HeroImageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all HeroImages
     * const heroImages = await prisma.heroImage.findMany()
     * 
     * // Get first 10 HeroImages
     * const heroImages = await prisma.heroImage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const heroImageWithIdOnly = await prisma.heroImage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends HeroImageFindManyArgs>(args?: SelectSubset<T, HeroImageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HeroImagePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a HeroImage.
     * @param {HeroImageCreateArgs} args - Arguments to create a HeroImage.
     * @example
     * // Create one HeroImage
     * const HeroImage = await prisma.heroImage.create({
     *   data: {
     *     // ... data to create a HeroImage
     *   }
     * })
     * 
     */
    create<T extends HeroImageCreateArgs>(args: SelectSubset<T, HeroImageCreateArgs<ExtArgs>>): Prisma__HeroImageClient<$Result.GetResult<Prisma.$HeroImagePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many HeroImages.
     * @param {HeroImageCreateManyArgs} args - Arguments to create many HeroImages.
     * @example
     * // Create many HeroImages
     * const heroImage = await prisma.heroImage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HeroImageCreateManyArgs>(args?: SelectSubset<T, HeroImageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many HeroImages and returns the data saved in the database.
     * @param {HeroImageCreateManyAndReturnArgs} args - Arguments to create many HeroImages.
     * @example
     * // Create many HeroImages
     * const heroImage = await prisma.heroImage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many HeroImages and only return the `id`
     * const heroImageWithIdOnly = await prisma.heroImage.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends HeroImageCreateManyAndReturnArgs>(args?: SelectSubset<T, HeroImageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HeroImagePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a HeroImage.
     * @param {HeroImageDeleteArgs} args - Arguments to delete one HeroImage.
     * @example
     * // Delete one HeroImage
     * const HeroImage = await prisma.heroImage.delete({
     *   where: {
     *     // ... filter to delete one HeroImage
     *   }
     * })
     * 
     */
    delete<T extends HeroImageDeleteArgs>(args: SelectSubset<T, HeroImageDeleteArgs<ExtArgs>>): Prisma__HeroImageClient<$Result.GetResult<Prisma.$HeroImagePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one HeroImage.
     * @param {HeroImageUpdateArgs} args - Arguments to update one HeroImage.
     * @example
     * // Update one HeroImage
     * const heroImage = await prisma.heroImage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HeroImageUpdateArgs>(args: SelectSubset<T, HeroImageUpdateArgs<ExtArgs>>): Prisma__HeroImageClient<$Result.GetResult<Prisma.$HeroImagePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more HeroImages.
     * @param {HeroImageDeleteManyArgs} args - Arguments to filter HeroImages to delete.
     * @example
     * // Delete a few HeroImages
     * const { count } = await prisma.heroImage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HeroImageDeleteManyArgs>(args?: SelectSubset<T, HeroImageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HeroImages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HeroImageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many HeroImages
     * const heroImage = await prisma.heroImage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HeroImageUpdateManyArgs>(args: SelectSubset<T, HeroImageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one HeroImage.
     * @param {HeroImageUpsertArgs} args - Arguments to update or create a HeroImage.
     * @example
     * // Update or create a HeroImage
     * const heroImage = await prisma.heroImage.upsert({
     *   create: {
     *     // ... data to create a HeroImage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the HeroImage we want to update
     *   }
     * })
     */
    upsert<T extends HeroImageUpsertArgs>(args: SelectSubset<T, HeroImageUpsertArgs<ExtArgs>>): Prisma__HeroImageClient<$Result.GetResult<Prisma.$HeroImagePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of HeroImages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HeroImageCountArgs} args - Arguments to filter HeroImages to count.
     * @example
     * // Count the number of HeroImages
     * const count = await prisma.heroImage.count({
     *   where: {
     *     // ... the filter for the HeroImages we want to count
     *   }
     * })
    **/
    count<T extends HeroImageCountArgs>(
      args?: Subset<T, HeroImageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HeroImageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a HeroImage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HeroImageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends HeroImageAggregateArgs>(args: Subset<T, HeroImageAggregateArgs>): Prisma.PrismaPromise<GetHeroImageAggregateType<T>>

    /**
     * Group by HeroImage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HeroImageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends HeroImageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HeroImageGroupByArgs['orderBy'] }
        : { orderBy?: HeroImageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, HeroImageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHeroImageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the HeroImage model
   */
  readonly fields: HeroImageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for HeroImage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HeroImageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the HeroImage model
   */ 
  interface HeroImageFieldRefs {
    readonly id: FieldRef<"HeroImage", 'Int'>
    readonly site: FieldRef<"HeroImage", 'SiteType'>
    readonly desktopImage: FieldRef<"HeroImage", 'String'>
    readonly mobileImage: FieldRef<"HeroImage", 'String'>
    readonly buttonLink: FieldRef<"HeroImage", 'String'>
    readonly order: FieldRef<"HeroImage", 'Int'>
    readonly isActive: FieldRef<"HeroImage", 'Boolean'>
    readonly createdAt: FieldRef<"HeroImage", 'DateTime'>
    readonly updatedAt: FieldRef<"HeroImage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * HeroImage findUnique
   */
  export type HeroImageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HeroImage
     */
    select?: HeroImageSelect<ExtArgs> | null
    /**
     * Filter, which HeroImage to fetch.
     */
    where: HeroImageWhereUniqueInput
  }

  /**
   * HeroImage findUniqueOrThrow
   */
  export type HeroImageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HeroImage
     */
    select?: HeroImageSelect<ExtArgs> | null
    /**
     * Filter, which HeroImage to fetch.
     */
    where: HeroImageWhereUniqueInput
  }

  /**
   * HeroImage findFirst
   */
  export type HeroImageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HeroImage
     */
    select?: HeroImageSelect<ExtArgs> | null
    /**
     * Filter, which HeroImage to fetch.
     */
    where?: HeroImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HeroImages to fetch.
     */
    orderBy?: HeroImageOrderByWithRelationInput | HeroImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HeroImages.
     */
    cursor?: HeroImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HeroImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HeroImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HeroImages.
     */
    distinct?: HeroImageScalarFieldEnum | HeroImageScalarFieldEnum[]
  }

  /**
   * HeroImage findFirstOrThrow
   */
  export type HeroImageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HeroImage
     */
    select?: HeroImageSelect<ExtArgs> | null
    /**
     * Filter, which HeroImage to fetch.
     */
    where?: HeroImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HeroImages to fetch.
     */
    orderBy?: HeroImageOrderByWithRelationInput | HeroImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HeroImages.
     */
    cursor?: HeroImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HeroImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HeroImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HeroImages.
     */
    distinct?: HeroImageScalarFieldEnum | HeroImageScalarFieldEnum[]
  }

  /**
   * HeroImage findMany
   */
  export type HeroImageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HeroImage
     */
    select?: HeroImageSelect<ExtArgs> | null
    /**
     * Filter, which HeroImages to fetch.
     */
    where?: HeroImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HeroImages to fetch.
     */
    orderBy?: HeroImageOrderByWithRelationInput | HeroImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing HeroImages.
     */
    cursor?: HeroImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HeroImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HeroImages.
     */
    skip?: number
    distinct?: HeroImageScalarFieldEnum | HeroImageScalarFieldEnum[]
  }

  /**
   * HeroImage create
   */
  export type HeroImageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HeroImage
     */
    select?: HeroImageSelect<ExtArgs> | null
    /**
     * The data needed to create a HeroImage.
     */
    data: XOR<HeroImageCreateInput, HeroImageUncheckedCreateInput>
  }

  /**
   * HeroImage createMany
   */
  export type HeroImageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many HeroImages.
     */
    data: HeroImageCreateManyInput | HeroImageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * HeroImage createManyAndReturn
   */
  export type HeroImageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HeroImage
     */
    select?: HeroImageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many HeroImages.
     */
    data: HeroImageCreateManyInput | HeroImageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * HeroImage update
   */
  export type HeroImageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HeroImage
     */
    select?: HeroImageSelect<ExtArgs> | null
    /**
     * The data needed to update a HeroImage.
     */
    data: XOR<HeroImageUpdateInput, HeroImageUncheckedUpdateInput>
    /**
     * Choose, which HeroImage to update.
     */
    where: HeroImageWhereUniqueInput
  }

  /**
   * HeroImage updateMany
   */
  export type HeroImageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update HeroImages.
     */
    data: XOR<HeroImageUpdateManyMutationInput, HeroImageUncheckedUpdateManyInput>
    /**
     * Filter which HeroImages to update
     */
    where?: HeroImageWhereInput
  }

  /**
   * HeroImage upsert
   */
  export type HeroImageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HeroImage
     */
    select?: HeroImageSelect<ExtArgs> | null
    /**
     * The filter to search for the HeroImage to update in case it exists.
     */
    where: HeroImageWhereUniqueInput
    /**
     * In case the HeroImage found by the `where` argument doesn't exist, create a new HeroImage with this data.
     */
    create: XOR<HeroImageCreateInput, HeroImageUncheckedCreateInput>
    /**
     * In case the HeroImage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HeroImageUpdateInput, HeroImageUncheckedUpdateInput>
  }

  /**
   * HeroImage delete
   */
  export type HeroImageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HeroImage
     */
    select?: HeroImageSelect<ExtArgs> | null
    /**
     * Filter which HeroImage to delete.
     */
    where: HeroImageWhereUniqueInput
  }

  /**
   * HeroImage deleteMany
   */
  export type HeroImageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HeroImages to delete
     */
    where?: HeroImageWhereInput
  }

  /**
   * HeroImage without action
   */
  export type HeroImageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HeroImage
     */
    select?: HeroImageSelect<ExtArgs> | null
  }


  /**
   * Model VideoBanner
   */

  export type AggregateVideoBanner = {
    _count: VideoBannerCountAggregateOutputType | null
    _avg: VideoBannerAvgAggregateOutputType | null
    _sum: VideoBannerSumAggregateOutputType | null
    _min: VideoBannerMinAggregateOutputType | null
    _max: VideoBannerMaxAggregateOutputType | null
  }

  export type VideoBannerAvgAggregateOutputType = {
    id: number | null
    durationSec: number | null
  }

  export type VideoBannerSumAggregateOutputType = {
    id: number | null
    durationSec: number | null
  }

  export type VideoBannerMinAggregateOutputType = {
    id: number | null
    site: $Enums.SiteType | null
    videoUrl: string | null
    aspectRatio: string | null
    durationSec: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VideoBannerMaxAggregateOutputType = {
    id: number | null
    site: $Enums.SiteType | null
    videoUrl: string | null
    aspectRatio: string | null
    durationSec: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VideoBannerCountAggregateOutputType = {
    id: number
    site: number
    videoUrl: number
    aspectRatio: number
    durationSec: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type VideoBannerAvgAggregateInputType = {
    id?: true
    durationSec?: true
  }

  export type VideoBannerSumAggregateInputType = {
    id?: true
    durationSec?: true
  }

  export type VideoBannerMinAggregateInputType = {
    id?: true
    site?: true
    videoUrl?: true
    aspectRatio?: true
    durationSec?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VideoBannerMaxAggregateInputType = {
    id?: true
    site?: true
    videoUrl?: true
    aspectRatio?: true
    durationSec?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VideoBannerCountAggregateInputType = {
    id?: true
    site?: true
    videoUrl?: true
    aspectRatio?: true
    durationSec?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type VideoBannerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VideoBanner to aggregate.
     */
    where?: VideoBannerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VideoBanners to fetch.
     */
    orderBy?: VideoBannerOrderByWithRelationInput | VideoBannerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VideoBannerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VideoBanners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VideoBanners.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VideoBanners
    **/
    _count?: true | VideoBannerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VideoBannerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VideoBannerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VideoBannerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VideoBannerMaxAggregateInputType
  }

  export type GetVideoBannerAggregateType<T extends VideoBannerAggregateArgs> = {
        [P in keyof T & keyof AggregateVideoBanner]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVideoBanner[P]>
      : GetScalarType<T[P], AggregateVideoBanner[P]>
  }




  export type VideoBannerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VideoBannerWhereInput
    orderBy?: VideoBannerOrderByWithAggregationInput | VideoBannerOrderByWithAggregationInput[]
    by: VideoBannerScalarFieldEnum[] | VideoBannerScalarFieldEnum
    having?: VideoBannerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VideoBannerCountAggregateInputType | true
    _avg?: VideoBannerAvgAggregateInputType
    _sum?: VideoBannerSumAggregateInputType
    _min?: VideoBannerMinAggregateInputType
    _max?: VideoBannerMaxAggregateInputType
  }

  export type VideoBannerGroupByOutputType = {
    id: number
    site: $Enums.SiteType
    videoUrl: string
    aspectRatio: string
    durationSec: number | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: VideoBannerCountAggregateOutputType | null
    _avg: VideoBannerAvgAggregateOutputType | null
    _sum: VideoBannerSumAggregateOutputType | null
    _min: VideoBannerMinAggregateOutputType | null
    _max: VideoBannerMaxAggregateOutputType | null
  }

  type GetVideoBannerGroupByPayload<T extends VideoBannerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VideoBannerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VideoBannerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VideoBannerGroupByOutputType[P]>
            : GetScalarType<T[P], VideoBannerGroupByOutputType[P]>
        }
      >
    >


  export type VideoBannerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    site?: boolean
    videoUrl?: boolean
    aspectRatio?: boolean
    durationSec?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["videoBanner"]>

  export type VideoBannerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    site?: boolean
    videoUrl?: boolean
    aspectRatio?: boolean
    durationSec?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["videoBanner"]>

  export type VideoBannerSelectScalar = {
    id?: boolean
    site?: boolean
    videoUrl?: boolean
    aspectRatio?: boolean
    durationSec?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $VideoBannerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VideoBanner"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      site: $Enums.SiteType
      videoUrl: string
      aspectRatio: string
      durationSec: number | null
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["videoBanner"]>
    composites: {}
  }

  type VideoBannerGetPayload<S extends boolean | null | undefined | VideoBannerDefaultArgs> = $Result.GetResult<Prisma.$VideoBannerPayload, S>

  type VideoBannerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<VideoBannerFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: VideoBannerCountAggregateInputType | true
    }

  export interface VideoBannerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VideoBanner'], meta: { name: 'VideoBanner' } }
    /**
     * Find zero or one VideoBanner that matches the filter.
     * @param {VideoBannerFindUniqueArgs} args - Arguments to find a VideoBanner
     * @example
     * // Get one VideoBanner
     * const videoBanner = await prisma.videoBanner.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VideoBannerFindUniqueArgs>(args: SelectSubset<T, VideoBannerFindUniqueArgs<ExtArgs>>): Prisma__VideoBannerClient<$Result.GetResult<Prisma.$VideoBannerPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one VideoBanner that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {VideoBannerFindUniqueOrThrowArgs} args - Arguments to find a VideoBanner
     * @example
     * // Get one VideoBanner
     * const videoBanner = await prisma.videoBanner.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VideoBannerFindUniqueOrThrowArgs>(args: SelectSubset<T, VideoBannerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VideoBannerClient<$Result.GetResult<Prisma.$VideoBannerPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first VideoBanner that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoBannerFindFirstArgs} args - Arguments to find a VideoBanner
     * @example
     * // Get one VideoBanner
     * const videoBanner = await prisma.videoBanner.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VideoBannerFindFirstArgs>(args?: SelectSubset<T, VideoBannerFindFirstArgs<ExtArgs>>): Prisma__VideoBannerClient<$Result.GetResult<Prisma.$VideoBannerPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first VideoBanner that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoBannerFindFirstOrThrowArgs} args - Arguments to find a VideoBanner
     * @example
     * // Get one VideoBanner
     * const videoBanner = await prisma.videoBanner.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VideoBannerFindFirstOrThrowArgs>(args?: SelectSubset<T, VideoBannerFindFirstOrThrowArgs<ExtArgs>>): Prisma__VideoBannerClient<$Result.GetResult<Prisma.$VideoBannerPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more VideoBanners that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoBannerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VideoBanners
     * const videoBanners = await prisma.videoBanner.findMany()
     * 
     * // Get first 10 VideoBanners
     * const videoBanners = await prisma.videoBanner.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const videoBannerWithIdOnly = await prisma.videoBanner.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VideoBannerFindManyArgs>(args?: SelectSubset<T, VideoBannerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VideoBannerPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a VideoBanner.
     * @param {VideoBannerCreateArgs} args - Arguments to create a VideoBanner.
     * @example
     * // Create one VideoBanner
     * const VideoBanner = await prisma.videoBanner.create({
     *   data: {
     *     // ... data to create a VideoBanner
     *   }
     * })
     * 
     */
    create<T extends VideoBannerCreateArgs>(args: SelectSubset<T, VideoBannerCreateArgs<ExtArgs>>): Prisma__VideoBannerClient<$Result.GetResult<Prisma.$VideoBannerPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many VideoBanners.
     * @param {VideoBannerCreateManyArgs} args - Arguments to create many VideoBanners.
     * @example
     * // Create many VideoBanners
     * const videoBanner = await prisma.videoBanner.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VideoBannerCreateManyArgs>(args?: SelectSubset<T, VideoBannerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VideoBanners and returns the data saved in the database.
     * @param {VideoBannerCreateManyAndReturnArgs} args - Arguments to create many VideoBanners.
     * @example
     * // Create many VideoBanners
     * const videoBanner = await prisma.videoBanner.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VideoBanners and only return the `id`
     * const videoBannerWithIdOnly = await prisma.videoBanner.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VideoBannerCreateManyAndReturnArgs>(args?: SelectSubset<T, VideoBannerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VideoBannerPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a VideoBanner.
     * @param {VideoBannerDeleteArgs} args - Arguments to delete one VideoBanner.
     * @example
     * // Delete one VideoBanner
     * const VideoBanner = await prisma.videoBanner.delete({
     *   where: {
     *     // ... filter to delete one VideoBanner
     *   }
     * })
     * 
     */
    delete<T extends VideoBannerDeleteArgs>(args: SelectSubset<T, VideoBannerDeleteArgs<ExtArgs>>): Prisma__VideoBannerClient<$Result.GetResult<Prisma.$VideoBannerPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one VideoBanner.
     * @param {VideoBannerUpdateArgs} args - Arguments to update one VideoBanner.
     * @example
     * // Update one VideoBanner
     * const videoBanner = await prisma.videoBanner.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VideoBannerUpdateArgs>(args: SelectSubset<T, VideoBannerUpdateArgs<ExtArgs>>): Prisma__VideoBannerClient<$Result.GetResult<Prisma.$VideoBannerPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more VideoBanners.
     * @param {VideoBannerDeleteManyArgs} args - Arguments to filter VideoBanners to delete.
     * @example
     * // Delete a few VideoBanners
     * const { count } = await prisma.videoBanner.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VideoBannerDeleteManyArgs>(args?: SelectSubset<T, VideoBannerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VideoBanners.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoBannerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VideoBanners
     * const videoBanner = await prisma.videoBanner.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VideoBannerUpdateManyArgs>(args: SelectSubset<T, VideoBannerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one VideoBanner.
     * @param {VideoBannerUpsertArgs} args - Arguments to update or create a VideoBanner.
     * @example
     * // Update or create a VideoBanner
     * const videoBanner = await prisma.videoBanner.upsert({
     *   create: {
     *     // ... data to create a VideoBanner
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VideoBanner we want to update
     *   }
     * })
     */
    upsert<T extends VideoBannerUpsertArgs>(args: SelectSubset<T, VideoBannerUpsertArgs<ExtArgs>>): Prisma__VideoBannerClient<$Result.GetResult<Prisma.$VideoBannerPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of VideoBanners.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoBannerCountArgs} args - Arguments to filter VideoBanners to count.
     * @example
     * // Count the number of VideoBanners
     * const count = await prisma.videoBanner.count({
     *   where: {
     *     // ... the filter for the VideoBanners we want to count
     *   }
     * })
    **/
    count<T extends VideoBannerCountArgs>(
      args?: Subset<T, VideoBannerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VideoBannerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VideoBanner.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoBannerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VideoBannerAggregateArgs>(args: Subset<T, VideoBannerAggregateArgs>): Prisma.PrismaPromise<GetVideoBannerAggregateType<T>>

    /**
     * Group by VideoBanner.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoBannerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VideoBannerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VideoBannerGroupByArgs['orderBy'] }
        : { orderBy?: VideoBannerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VideoBannerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVideoBannerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VideoBanner model
   */
  readonly fields: VideoBannerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VideoBanner.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VideoBannerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VideoBanner model
   */ 
  interface VideoBannerFieldRefs {
    readonly id: FieldRef<"VideoBanner", 'Int'>
    readonly site: FieldRef<"VideoBanner", 'SiteType'>
    readonly videoUrl: FieldRef<"VideoBanner", 'String'>
    readonly aspectRatio: FieldRef<"VideoBanner", 'String'>
    readonly durationSec: FieldRef<"VideoBanner", 'Int'>
    readonly isActive: FieldRef<"VideoBanner", 'Boolean'>
    readonly createdAt: FieldRef<"VideoBanner", 'DateTime'>
    readonly updatedAt: FieldRef<"VideoBanner", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * VideoBanner findUnique
   */
  export type VideoBannerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoBanner
     */
    select?: VideoBannerSelect<ExtArgs> | null
    /**
     * Filter, which VideoBanner to fetch.
     */
    where: VideoBannerWhereUniqueInput
  }

  /**
   * VideoBanner findUniqueOrThrow
   */
  export type VideoBannerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoBanner
     */
    select?: VideoBannerSelect<ExtArgs> | null
    /**
     * Filter, which VideoBanner to fetch.
     */
    where: VideoBannerWhereUniqueInput
  }

  /**
   * VideoBanner findFirst
   */
  export type VideoBannerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoBanner
     */
    select?: VideoBannerSelect<ExtArgs> | null
    /**
     * Filter, which VideoBanner to fetch.
     */
    where?: VideoBannerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VideoBanners to fetch.
     */
    orderBy?: VideoBannerOrderByWithRelationInput | VideoBannerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VideoBanners.
     */
    cursor?: VideoBannerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VideoBanners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VideoBanners.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VideoBanners.
     */
    distinct?: VideoBannerScalarFieldEnum | VideoBannerScalarFieldEnum[]
  }

  /**
   * VideoBanner findFirstOrThrow
   */
  export type VideoBannerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoBanner
     */
    select?: VideoBannerSelect<ExtArgs> | null
    /**
     * Filter, which VideoBanner to fetch.
     */
    where?: VideoBannerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VideoBanners to fetch.
     */
    orderBy?: VideoBannerOrderByWithRelationInput | VideoBannerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VideoBanners.
     */
    cursor?: VideoBannerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VideoBanners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VideoBanners.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VideoBanners.
     */
    distinct?: VideoBannerScalarFieldEnum | VideoBannerScalarFieldEnum[]
  }

  /**
   * VideoBanner findMany
   */
  export type VideoBannerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoBanner
     */
    select?: VideoBannerSelect<ExtArgs> | null
    /**
     * Filter, which VideoBanners to fetch.
     */
    where?: VideoBannerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VideoBanners to fetch.
     */
    orderBy?: VideoBannerOrderByWithRelationInput | VideoBannerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VideoBanners.
     */
    cursor?: VideoBannerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VideoBanners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VideoBanners.
     */
    skip?: number
    distinct?: VideoBannerScalarFieldEnum | VideoBannerScalarFieldEnum[]
  }

  /**
   * VideoBanner create
   */
  export type VideoBannerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoBanner
     */
    select?: VideoBannerSelect<ExtArgs> | null
    /**
     * The data needed to create a VideoBanner.
     */
    data: XOR<VideoBannerCreateInput, VideoBannerUncheckedCreateInput>
  }

  /**
   * VideoBanner createMany
   */
  export type VideoBannerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VideoBanners.
     */
    data: VideoBannerCreateManyInput | VideoBannerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VideoBanner createManyAndReturn
   */
  export type VideoBannerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoBanner
     */
    select?: VideoBannerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many VideoBanners.
     */
    data: VideoBannerCreateManyInput | VideoBannerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VideoBanner update
   */
  export type VideoBannerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoBanner
     */
    select?: VideoBannerSelect<ExtArgs> | null
    /**
     * The data needed to update a VideoBanner.
     */
    data: XOR<VideoBannerUpdateInput, VideoBannerUncheckedUpdateInput>
    /**
     * Choose, which VideoBanner to update.
     */
    where: VideoBannerWhereUniqueInput
  }

  /**
   * VideoBanner updateMany
   */
  export type VideoBannerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VideoBanners.
     */
    data: XOR<VideoBannerUpdateManyMutationInput, VideoBannerUncheckedUpdateManyInput>
    /**
     * Filter which VideoBanners to update
     */
    where?: VideoBannerWhereInput
  }

  /**
   * VideoBanner upsert
   */
  export type VideoBannerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoBanner
     */
    select?: VideoBannerSelect<ExtArgs> | null
    /**
     * The filter to search for the VideoBanner to update in case it exists.
     */
    where: VideoBannerWhereUniqueInput
    /**
     * In case the VideoBanner found by the `where` argument doesn't exist, create a new VideoBanner with this data.
     */
    create: XOR<VideoBannerCreateInput, VideoBannerUncheckedCreateInput>
    /**
     * In case the VideoBanner was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VideoBannerUpdateInput, VideoBannerUncheckedUpdateInput>
  }

  /**
   * VideoBanner delete
   */
  export type VideoBannerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoBanner
     */
    select?: VideoBannerSelect<ExtArgs> | null
    /**
     * Filter which VideoBanner to delete.
     */
    where: VideoBannerWhereUniqueInput
  }

  /**
   * VideoBanner deleteMany
   */
  export type VideoBannerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VideoBanners to delete
     */
    where?: VideoBannerWhereInput
  }

  /**
   * VideoBanner without action
   */
  export type VideoBannerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoBanner
     */
    select?: VideoBannerSelect<ExtArgs> | null
  }


  /**
   * Model GalleryItem
   */

  export type AggregateGalleryItem = {
    _count: GalleryItemCountAggregateOutputType | null
    _avg: GalleryItemAvgAggregateOutputType | null
    _sum: GalleryItemSumAggregateOutputType | null
    _min: GalleryItemMinAggregateOutputType | null
    _max: GalleryItemMaxAggregateOutputType | null
  }

  export type GalleryItemAvgAggregateOutputType = {
    id: number | null
    order: number | null
  }

  export type GalleryItemSumAggregateOutputType = {
    id: number | null
    order: number | null
  }

  export type GalleryItemMinAggregateOutputType = {
    id: number | null
    site: $Enums.SiteType | null
    mediaUrl: string | null
    thumbnailUrl: string | null
    title: string | null
    mediaType: string | null
    aspectRatio: string | null
    order: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GalleryItemMaxAggregateOutputType = {
    id: number | null
    site: $Enums.SiteType | null
    mediaUrl: string | null
    thumbnailUrl: string | null
    title: string | null
    mediaType: string | null
    aspectRatio: string | null
    order: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GalleryItemCountAggregateOutputType = {
    id: number
    site: number
    mediaUrl: number
    thumbnailUrl: number
    title: number
    mediaType: number
    aspectRatio: number
    order: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type GalleryItemAvgAggregateInputType = {
    id?: true
    order?: true
  }

  export type GalleryItemSumAggregateInputType = {
    id?: true
    order?: true
  }

  export type GalleryItemMinAggregateInputType = {
    id?: true
    site?: true
    mediaUrl?: true
    thumbnailUrl?: true
    title?: true
    mediaType?: true
    aspectRatio?: true
    order?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GalleryItemMaxAggregateInputType = {
    id?: true
    site?: true
    mediaUrl?: true
    thumbnailUrl?: true
    title?: true
    mediaType?: true
    aspectRatio?: true
    order?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GalleryItemCountAggregateInputType = {
    id?: true
    site?: true
    mediaUrl?: true
    thumbnailUrl?: true
    title?: true
    mediaType?: true
    aspectRatio?: true
    order?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type GalleryItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GalleryItem to aggregate.
     */
    where?: GalleryItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GalleryItems to fetch.
     */
    orderBy?: GalleryItemOrderByWithRelationInput | GalleryItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GalleryItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GalleryItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GalleryItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GalleryItems
    **/
    _count?: true | GalleryItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GalleryItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GalleryItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GalleryItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GalleryItemMaxAggregateInputType
  }

  export type GetGalleryItemAggregateType<T extends GalleryItemAggregateArgs> = {
        [P in keyof T & keyof AggregateGalleryItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGalleryItem[P]>
      : GetScalarType<T[P], AggregateGalleryItem[P]>
  }




  export type GalleryItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GalleryItemWhereInput
    orderBy?: GalleryItemOrderByWithAggregationInput | GalleryItemOrderByWithAggregationInput[]
    by: GalleryItemScalarFieldEnum[] | GalleryItemScalarFieldEnum
    having?: GalleryItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GalleryItemCountAggregateInputType | true
    _avg?: GalleryItemAvgAggregateInputType
    _sum?: GalleryItemSumAggregateInputType
    _min?: GalleryItemMinAggregateInputType
    _max?: GalleryItemMaxAggregateInputType
  }

  export type GalleryItemGroupByOutputType = {
    id: number
    site: $Enums.SiteType
    mediaUrl: string
    thumbnailUrl: string | null
    title: string
    mediaType: string
    aspectRatio: string
    order: number
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: GalleryItemCountAggregateOutputType | null
    _avg: GalleryItemAvgAggregateOutputType | null
    _sum: GalleryItemSumAggregateOutputType | null
    _min: GalleryItemMinAggregateOutputType | null
    _max: GalleryItemMaxAggregateOutputType | null
  }

  type GetGalleryItemGroupByPayload<T extends GalleryItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GalleryItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GalleryItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GalleryItemGroupByOutputType[P]>
            : GetScalarType<T[P], GalleryItemGroupByOutputType[P]>
        }
      >
    >


  export type GalleryItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    site?: boolean
    mediaUrl?: boolean
    thumbnailUrl?: boolean
    title?: boolean
    mediaType?: boolean
    aspectRatio?: boolean
    order?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["galleryItem"]>

  export type GalleryItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    site?: boolean
    mediaUrl?: boolean
    thumbnailUrl?: boolean
    title?: boolean
    mediaType?: boolean
    aspectRatio?: boolean
    order?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["galleryItem"]>

  export type GalleryItemSelectScalar = {
    id?: boolean
    site?: boolean
    mediaUrl?: boolean
    thumbnailUrl?: boolean
    title?: boolean
    mediaType?: boolean
    aspectRatio?: boolean
    order?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $GalleryItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GalleryItem"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      site: $Enums.SiteType
      mediaUrl: string
      thumbnailUrl: string | null
      title: string
      mediaType: string
      aspectRatio: string
      order: number
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["galleryItem"]>
    composites: {}
  }

  type GalleryItemGetPayload<S extends boolean | null | undefined | GalleryItemDefaultArgs> = $Result.GetResult<Prisma.$GalleryItemPayload, S>

  type GalleryItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<GalleryItemFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: GalleryItemCountAggregateInputType | true
    }

  export interface GalleryItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GalleryItem'], meta: { name: 'GalleryItem' } }
    /**
     * Find zero or one GalleryItem that matches the filter.
     * @param {GalleryItemFindUniqueArgs} args - Arguments to find a GalleryItem
     * @example
     * // Get one GalleryItem
     * const galleryItem = await prisma.galleryItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GalleryItemFindUniqueArgs>(args: SelectSubset<T, GalleryItemFindUniqueArgs<ExtArgs>>): Prisma__GalleryItemClient<$Result.GetResult<Prisma.$GalleryItemPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one GalleryItem that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {GalleryItemFindUniqueOrThrowArgs} args - Arguments to find a GalleryItem
     * @example
     * // Get one GalleryItem
     * const galleryItem = await prisma.galleryItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GalleryItemFindUniqueOrThrowArgs>(args: SelectSubset<T, GalleryItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GalleryItemClient<$Result.GetResult<Prisma.$GalleryItemPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first GalleryItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GalleryItemFindFirstArgs} args - Arguments to find a GalleryItem
     * @example
     * // Get one GalleryItem
     * const galleryItem = await prisma.galleryItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GalleryItemFindFirstArgs>(args?: SelectSubset<T, GalleryItemFindFirstArgs<ExtArgs>>): Prisma__GalleryItemClient<$Result.GetResult<Prisma.$GalleryItemPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first GalleryItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GalleryItemFindFirstOrThrowArgs} args - Arguments to find a GalleryItem
     * @example
     * // Get one GalleryItem
     * const galleryItem = await prisma.galleryItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GalleryItemFindFirstOrThrowArgs>(args?: SelectSubset<T, GalleryItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__GalleryItemClient<$Result.GetResult<Prisma.$GalleryItemPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more GalleryItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GalleryItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GalleryItems
     * const galleryItems = await prisma.galleryItem.findMany()
     * 
     * // Get first 10 GalleryItems
     * const galleryItems = await prisma.galleryItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const galleryItemWithIdOnly = await prisma.galleryItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GalleryItemFindManyArgs>(args?: SelectSubset<T, GalleryItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GalleryItemPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a GalleryItem.
     * @param {GalleryItemCreateArgs} args - Arguments to create a GalleryItem.
     * @example
     * // Create one GalleryItem
     * const GalleryItem = await prisma.galleryItem.create({
     *   data: {
     *     // ... data to create a GalleryItem
     *   }
     * })
     * 
     */
    create<T extends GalleryItemCreateArgs>(args: SelectSubset<T, GalleryItemCreateArgs<ExtArgs>>): Prisma__GalleryItemClient<$Result.GetResult<Prisma.$GalleryItemPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many GalleryItems.
     * @param {GalleryItemCreateManyArgs} args - Arguments to create many GalleryItems.
     * @example
     * // Create many GalleryItems
     * const galleryItem = await prisma.galleryItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GalleryItemCreateManyArgs>(args?: SelectSubset<T, GalleryItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GalleryItems and returns the data saved in the database.
     * @param {GalleryItemCreateManyAndReturnArgs} args - Arguments to create many GalleryItems.
     * @example
     * // Create many GalleryItems
     * const galleryItem = await prisma.galleryItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GalleryItems and only return the `id`
     * const galleryItemWithIdOnly = await prisma.galleryItem.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GalleryItemCreateManyAndReturnArgs>(args?: SelectSubset<T, GalleryItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GalleryItemPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a GalleryItem.
     * @param {GalleryItemDeleteArgs} args - Arguments to delete one GalleryItem.
     * @example
     * // Delete one GalleryItem
     * const GalleryItem = await prisma.galleryItem.delete({
     *   where: {
     *     // ... filter to delete one GalleryItem
     *   }
     * })
     * 
     */
    delete<T extends GalleryItemDeleteArgs>(args: SelectSubset<T, GalleryItemDeleteArgs<ExtArgs>>): Prisma__GalleryItemClient<$Result.GetResult<Prisma.$GalleryItemPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one GalleryItem.
     * @param {GalleryItemUpdateArgs} args - Arguments to update one GalleryItem.
     * @example
     * // Update one GalleryItem
     * const galleryItem = await prisma.galleryItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GalleryItemUpdateArgs>(args: SelectSubset<T, GalleryItemUpdateArgs<ExtArgs>>): Prisma__GalleryItemClient<$Result.GetResult<Prisma.$GalleryItemPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more GalleryItems.
     * @param {GalleryItemDeleteManyArgs} args - Arguments to filter GalleryItems to delete.
     * @example
     * // Delete a few GalleryItems
     * const { count } = await prisma.galleryItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GalleryItemDeleteManyArgs>(args?: SelectSubset<T, GalleryItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GalleryItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GalleryItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GalleryItems
     * const galleryItem = await prisma.galleryItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GalleryItemUpdateManyArgs>(args: SelectSubset<T, GalleryItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one GalleryItem.
     * @param {GalleryItemUpsertArgs} args - Arguments to update or create a GalleryItem.
     * @example
     * // Update or create a GalleryItem
     * const galleryItem = await prisma.galleryItem.upsert({
     *   create: {
     *     // ... data to create a GalleryItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GalleryItem we want to update
     *   }
     * })
     */
    upsert<T extends GalleryItemUpsertArgs>(args: SelectSubset<T, GalleryItemUpsertArgs<ExtArgs>>): Prisma__GalleryItemClient<$Result.GetResult<Prisma.$GalleryItemPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of GalleryItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GalleryItemCountArgs} args - Arguments to filter GalleryItems to count.
     * @example
     * // Count the number of GalleryItems
     * const count = await prisma.galleryItem.count({
     *   where: {
     *     // ... the filter for the GalleryItems we want to count
     *   }
     * })
    **/
    count<T extends GalleryItemCountArgs>(
      args?: Subset<T, GalleryItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GalleryItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GalleryItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GalleryItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GalleryItemAggregateArgs>(args: Subset<T, GalleryItemAggregateArgs>): Prisma.PrismaPromise<GetGalleryItemAggregateType<T>>

    /**
     * Group by GalleryItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GalleryItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GalleryItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GalleryItemGroupByArgs['orderBy'] }
        : { orderBy?: GalleryItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GalleryItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGalleryItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GalleryItem model
   */
  readonly fields: GalleryItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GalleryItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GalleryItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GalleryItem model
   */ 
  interface GalleryItemFieldRefs {
    readonly id: FieldRef<"GalleryItem", 'Int'>
    readonly site: FieldRef<"GalleryItem", 'SiteType'>
    readonly mediaUrl: FieldRef<"GalleryItem", 'String'>
    readonly thumbnailUrl: FieldRef<"GalleryItem", 'String'>
    readonly title: FieldRef<"GalleryItem", 'String'>
    readonly mediaType: FieldRef<"GalleryItem", 'String'>
    readonly aspectRatio: FieldRef<"GalleryItem", 'String'>
    readonly order: FieldRef<"GalleryItem", 'Int'>
    readonly isActive: FieldRef<"GalleryItem", 'Boolean'>
    readonly createdAt: FieldRef<"GalleryItem", 'DateTime'>
    readonly updatedAt: FieldRef<"GalleryItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GalleryItem findUnique
   */
  export type GalleryItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GalleryItem
     */
    select?: GalleryItemSelect<ExtArgs> | null
    /**
     * Filter, which GalleryItem to fetch.
     */
    where: GalleryItemWhereUniqueInput
  }

  /**
   * GalleryItem findUniqueOrThrow
   */
  export type GalleryItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GalleryItem
     */
    select?: GalleryItemSelect<ExtArgs> | null
    /**
     * Filter, which GalleryItem to fetch.
     */
    where: GalleryItemWhereUniqueInput
  }

  /**
   * GalleryItem findFirst
   */
  export type GalleryItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GalleryItem
     */
    select?: GalleryItemSelect<ExtArgs> | null
    /**
     * Filter, which GalleryItem to fetch.
     */
    where?: GalleryItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GalleryItems to fetch.
     */
    orderBy?: GalleryItemOrderByWithRelationInput | GalleryItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GalleryItems.
     */
    cursor?: GalleryItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GalleryItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GalleryItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GalleryItems.
     */
    distinct?: GalleryItemScalarFieldEnum | GalleryItemScalarFieldEnum[]
  }

  /**
   * GalleryItem findFirstOrThrow
   */
  export type GalleryItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GalleryItem
     */
    select?: GalleryItemSelect<ExtArgs> | null
    /**
     * Filter, which GalleryItem to fetch.
     */
    where?: GalleryItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GalleryItems to fetch.
     */
    orderBy?: GalleryItemOrderByWithRelationInput | GalleryItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GalleryItems.
     */
    cursor?: GalleryItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GalleryItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GalleryItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GalleryItems.
     */
    distinct?: GalleryItemScalarFieldEnum | GalleryItemScalarFieldEnum[]
  }

  /**
   * GalleryItem findMany
   */
  export type GalleryItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GalleryItem
     */
    select?: GalleryItemSelect<ExtArgs> | null
    /**
     * Filter, which GalleryItems to fetch.
     */
    where?: GalleryItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GalleryItems to fetch.
     */
    orderBy?: GalleryItemOrderByWithRelationInput | GalleryItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GalleryItems.
     */
    cursor?: GalleryItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GalleryItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GalleryItems.
     */
    skip?: number
    distinct?: GalleryItemScalarFieldEnum | GalleryItemScalarFieldEnum[]
  }

  /**
   * GalleryItem create
   */
  export type GalleryItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GalleryItem
     */
    select?: GalleryItemSelect<ExtArgs> | null
    /**
     * The data needed to create a GalleryItem.
     */
    data: XOR<GalleryItemCreateInput, GalleryItemUncheckedCreateInput>
  }

  /**
   * GalleryItem createMany
   */
  export type GalleryItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GalleryItems.
     */
    data: GalleryItemCreateManyInput | GalleryItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GalleryItem createManyAndReturn
   */
  export type GalleryItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GalleryItem
     */
    select?: GalleryItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many GalleryItems.
     */
    data: GalleryItemCreateManyInput | GalleryItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GalleryItem update
   */
  export type GalleryItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GalleryItem
     */
    select?: GalleryItemSelect<ExtArgs> | null
    /**
     * The data needed to update a GalleryItem.
     */
    data: XOR<GalleryItemUpdateInput, GalleryItemUncheckedUpdateInput>
    /**
     * Choose, which GalleryItem to update.
     */
    where: GalleryItemWhereUniqueInput
  }

  /**
   * GalleryItem updateMany
   */
  export type GalleryItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GalleryItems.
     */
    data: XOR<GalleryItemUpdateManyMutationInput, GalleryItemUncheckedUpdateManyInput>
    /**
     * Filter which GalleryItems to update
     */
    where?: GalleryItemWhereInput
  }

  /**
   * GalleryItem upsert
   */
  export type GalleryItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GalleryItem
     */
    select?: GalleryItemSelect<ExtArgs> | null
    /**
     * The filter to search for the GalleryItem to update in case it exists.
     */
    where: GalleryItemWhereUniqueInput
    /**
     * In case the GalleryItem found by the `where` argument doesn't exist, create a new GalleryItem with this data.
     */
    create: XOR<GalleryItemCreateInput, GalleryItemUncheckedCreateInput>
    /**
     * In case the GalleryItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GalleryItemUpdateInput, GalleryItemUncheckedUpdateInput>
  }

  /**
   * GalleryItem delete
   */
  export type GalleryItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GalleryItem
     */
    select?: GalleryItemSelect<ExtArgs> | null
    /**
     * Filter which GalleryItem to delete.
     */
    where: GalleryItemWhereUniqueInput
  }

  /**
   * GalleryItem deleteMany
   */
  export type GalleryItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GalleryItems to delete
     */
    where?: GalleryItemWhereInput
  }

  /**
   * GalleryItem without action
   */
  export type GalleryItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GalleryItem
     */
    select?: GalleryItemSelect<ExtArgs> | null
  }


  /**
   * Model BlogPost
   */

  export type AggregateBlogPost = {
    _count: BlogPostCountAggregateOutputType | null
    _avg: BlogPostAvgAggregateOutputType | null
    _sum: BlogPostSumAggregateOutputType | null
    _min: BlogPostMinAggregateOutputType | null
    _max: BlogPostMaxAggregateOutputType | null
  }

  export type BlogPostAvgAggregateOutputType = {
    id: number | null
  }

  export type BlogPostSumAggregateOutputType = {
    id: number | null
  }

  export type BlogPostMinAggregateOutputType = {
    id: number | null
    imageUrl: string | null
    imageRatio: string | null
    title: string | null
    author: string | null
    article: string | null
    publishedAt: Date | null
    isPublished: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BlogPostMaxAggregateOutputType = {
    id: number | null
    imageUrl: string | null
    imageRatio: string | null
    title: string | null
    author: string | null
    article: string | null
    publishedAt: Date | null
    isPublished: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BlogPostCountAggregateOutputType = {
    id: number
    imageUrl: number
    imageRatio: number
    title: number
    author: number
    article: number
    publishedAt: number
    isPublished: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BlogPostAvgAggregateInputType = {
    id?: true
  }

  export type BlogPostSumAggregateInputType = {
    id?: true
  }

  export type BlogPostMinAggregateInputType = {
    id?: true
    imageUrl?: true
    imageRatio?: true
    title?: true
    author?: true
    article?: true
    publishedAt?: true
    isPublished?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BlogPostMaxAggregateInputType = {
    id?: true
    imageUrl?: true
    imageRatio?: true
    title?: true
    author?: true
    article?: true
    publishedAt?: true
    isPublished?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BlogPostCountAggregateInputType = {
    id?: true
    imageUrl?: true
    imageRatio?: true
    title?: true
    author?: true
    article?: true
    publishedAt?: true
    isPublished?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BlogPostAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BlogPost to aggregate.
     */
    where?: BlogPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlogPosts to fetch.
     */
    orderBy?: BlogPostOrderByWithRelationInput | BlogPostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BlogPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlogPosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlogPosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BlogPosts
    **/
    _count?: true | BlogPostCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BlogPostAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BlogPostSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BlogPostMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BlogPostMaxAggregateInputType
  }

  export type GetBlogPostAggregateType<T extends BlogPostAggregateArgs> = {
        [P in keyof T & keyof AggregateBlogPost]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBlogPost[P]>
      : GetScalarType<T[P], AggregateBlogPost[P]>
  }




  export type BlogPostGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BlogPostWhereInput
    orderBy?: BlogPostOrderByWithAggregationInput | BlogPostOrderByWithAggregationInput[]
    by: BlogPostScalarFieldEnum[] | BlogPostScalarFieldEnum
    having?: BlogPostScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BlogPostCountAggregateInputType | true
    _avg?: BlogPostAvgAggregateInputType
    _sum?: BlogPostSumAggregateInputType
    _min?: BlogPostMinAggregateInputType
    _max?: BlogPostMaxAggregateInputType
  }

  export type BlogPostGroupByOutputType = {
    id: number
    imageUrl: string
    imageRatio: string
    title: string
    author: string
    article: string
    publishedAt: Date
    isPublished: boolean
    createdAt: Date
    updatedAt: Date
    _count: BlogPostCountAggregateOutputType | null
    _avg: BlogPostAvgAggregateOutputType | null
    _sum: BlogPostSumAggregateOutputType | null
    _min: BlogPostMinAggregateOutputType | null
    _max: BlogPostMaxAggregateOutputType | null
  }

  type GetBlogPostGroupByPayload<T extends BlogPostGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BlogPostGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BlogPostGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BlogPostGroupByOutputType[P]>
            : GetScalarType<T[P], BlogPostGroupByOutputType[P]>
        }
      >
    >


  export type BlogPostSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    imageUrl?: boolean
    imageRatio?: boolean
    title?: boolean
    author?: boolean
    article?: boolean
    publishedAt?: boolean
    isPublished?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["blogPost"]>

  export type BlogPostSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    imageUrl?: boolean
    imageRatio?: boolean
    title?: boolean
    author?: boolean
    article?: boolean
    publishedAt?: boolean
    isPublished?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["blogPost"]>

  export type BlogPostSelectScalar = {
    id?: boolean
    imageUrl?: boolean
    imageRatio?: boolean
    title?: boolean
    author?: boolean
    article?: boolean
    publishedAt?: boolean
    isPublished?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $BlogPostPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BlogPost"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      imageUrl: string
      imageRatio: string
      title: string
      author: string
      article: string
      publishedAt: Date
      isPublished: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["blogPost"]>
    composites: {}
  }

  type BlogPostGetPayload<S extends boolean | null | undefined | BlogPostDefaultArgs> = $Result.GetResult<Prisma.$BlogPostPayload, S>

  type BlogPostCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<BlogPostFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: BlogPostCountAggregateInputType | true
    }

  export interface BlogPostDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BlogPost'], meta: { name: 'BlogPost' } }
    /**
     * Find zero or one BlogPost that matches the filter.
     * @param {BlogPostFindUniqueArgs} args - Arguments to find a BlogPost
     * @example
     * // Get one BlogPost
     * const blogPost = await prisma.blogPost.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BlogPostFindUniqueArgs>(args: SelectSubset<T, BlogPostFindUniqueArgs<ExtArgs>>): Prisma__BlogPostClient<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one BlogPost that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {BlogPostFindUniqueOrThrowArgs} args - Arguments to find a BlogPost
     * @example
     * // Get one BlogPost
     * const blogPost = await prisma.blogPost.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BlogPostFindUniqueOrThrowArgs>(args: SelectSubset<T, BlogPostFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BlogPostClient<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first BlogPost that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogPostFindFirstArgs} args - Arguments to find a BlogPost
     * @example
     * // Get one BlogPost
     * const blogPost = await prisma.blogPost.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BlogPostFindFirstArgs>(args?: SelectSubset<T, BlogPostFindFirstArgs<ExtArgs>>): Prisma__BlogPostClient<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first BlogPost that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogPostFindFirstOrThrowArgs} args - Arguments to find a BlogPost
     * @example
     * // Get one BlogPost
     * const blogPost = await prisma.blogPost.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BlogPostFindFirstOrThrowArgs>(args?: SelectSubset<T, BlogPostFindFirstOrThrowArgs<ExtArgs>>): Prisma__BlogPostClient<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more BlogPosts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogPostFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BlogPosts
     * const blogPosts = await prisma.blogPost.findMany()
     * 
     * // Get first 10 BlogPosts
     * const blogPosts = await prisma.blogPost.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const blogPostWithIdOnly = await prisma.blogPost.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BlogPostFindManyArgs>(args?: SelectSubset<T, BlogPostFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a BlogPost.
     * @param {BlogPostCreateArgs} args - Arguments to create a BlogPost.
     * @example
     * // Create one BlogPost
     * const BlogPost = await prisma.blogPost.create({
     *   data: {
     *     // ... data to create a BlogPost
     *   }
     * })
     * 
     */
    create<T extends BlogPostCreateArgs>(args: SelectSubset<T, BlogPostCreateArgs<ExtArgs>>): Prisma__BlogPostClient<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many BlogPosts.
     * @param {BlogPostCreateManyArgs} args - Arguments to create many BlogPosts.
     * @example
     * // Create many BlogPosts
     * const blogPost = await prisma.blogPost.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BlogPostCreateManyArgs>(args?: SelectSubset<T, BlogPostCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BlogPosts and returns the data saved in the database.
     * @param {BlogPostCreateManyAndReturnArgs} args - Arguments to create many BlogPosts.
     * @example
     * // Create many BlogPosts
     * const blogPost = await prisma.blogPost.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BlogPosts and only return the `id`
     * const blogPostWithIdOnly = await prisma.blogPost.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BlogPostCreateManyAndReturnArgs>(args?: SelectSubset<T, BlogPostCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a BlogPost.
     * @param {BlogPostDeleteArgs} args - Arguments to delete one BlogPost.
     * @example
     * // Delete one BlogPost
     * const BlogPost = await prisma.blogPost.delete({
     *   where: {
     *     // ... filter to delete one BlogPost
     *   }
     * })
     * 
     */
    delete<T extends BlogPostDeleteArgs>(args: SelectSubset<T, BlogPostDeleteArgs<ExtArgs>>): Prisma__BlogPostClient<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one BlogPost.
     * @param {BlogPostUpdateArgs} args - Arguments to update one BlogPost.
     * @example
     * // Update one BlogPost
     * const blogPost = await prisma.blogPost.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BlogPostUpdateArgs>(args: SelectSubset<T, BlogPostUpdateArgs<ExtArgs>>): Prisma__BlogPostClient<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more BlogPosts.
     * @param {BlogPostDeleteManyArgs} args - Arguments to filter BlogPosts to delete.
     * @example
     * // Delete a few BlogPosts
     * const { count } = await prisma.blogPost.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BlogPostDeleteManyArgs>(args?: SelectSubset<T, BlogPostDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BlogPosts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogPostUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BlogPosts
     * const blogPost = await prisma.blogPost.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BlogPostUpdateManyArgs>(args: SelectSubset<T, BlogPostUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one BlogPost.
     * @param {BlogPostUpsertArgs} args - Arguments to update or create a BlogPost.
     * @example
     * // Update or create a BlogPost
     * const blogPost = await prisma.blogPost.upsert({
     *   create: {
     *     // ... data to create a BlogPost
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BlogPost we want to update
     *   }
     * })
     */
    upsert<T extends BlogPostUpsertArgs>(args: SelectSubset<T, BlogPostUpsertArgs<ExtArgs>>): Prisma__BlogPostClient<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of BlogPosts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogPostCountArgs} args - Arguments to filter BlogPosts to count.
     * @example
     * // Count the number of BlogPosts
     * const count = await prisma.blogPost.count({
     *   where: {
     *     // ... the filter for the BlogPosts we want to count
     *   }
     * })
    **/
    count<T extends BlogPostCountArgs>(
      args?: Subset<T, BlogPostCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BlogPostCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BlogPost.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogPostAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BlogPostAggregateArgs>(args: Subset<T, BlogPostAggregateArgs>): Prisma.PrismaPromise<GetBlogPostAggregateType<T>>

    /**
     * Group by BlogPost.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogPostGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BlogPostGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BlogPostGroupByArgs['orderBy'] }
        : { orderBy?: BlogPostGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BlogPostGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBlogPostGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BlogPost model
   */
  readonly fields: BlogPostFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BlogPost.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BlogPostClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BlogPost model
   */ 
  interface BlogPostFieldRefs {
    readonly id: FieldRef<"BlogPost", 'Int'>
    readonly imageUrl: FieldRef<"BlogPost", 'String'>
    readonly imageRatio: FieldRef<"BlogPost", 'String'>
    readonly title: FieldRef<"BlogPost", 'String'>
    readonly author: FieldRef<"BlogPost", 'String'>
    readonly article: FieldRef<"BlogPost", 'String'>
    readonly publishedAt: FieldRef<"BlogPost", 'DateTime'>
    readonly isPublished: FieldRef<"BlogPost", 'Boolean'>
    readonly createdAt: FieldRef<"BlogPost", 'DateTime'>
    readonly updatedAt: FieldRef<"BlogPost", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BlogPost findUnique
   */
  export type BlogPostFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * Filter, which BlogPost to fetch.
     */
    where: BlogPostWhereUniqueInput
  }

  /**
   * BlogPost findUniqueOrThrow
   */
  export type BlogPostFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * Filter, which BlogPost to fetch.
     */
    where: BlogPostWhereUniqueInput
  }

  /**
   * BlogPost findFirst
   */
  export type BlogPostFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * Filter, which BlogPost to fetch.
     */
    where?: BlogPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlogPosts to fetch.
     */
    orderBy?: BlogPostOrderByWithRelationInput | BlogPostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BlogPosts.
     */
    cursor?: BlogPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlogPosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlogPosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BlogPosts.
     */
    distinct?: BlogPostScalarFieldEnum | BlogPostScalarFieldEnum[]
  }

  /**
   * BlogPost findFirstOrThrow
   */
  export type BlogPostFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * Filter, which BlogPost to fetch.
     */
    where?: BlogPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlogPosts to fetch.
     */
    orderBy?: BlogPostOrderByWithRelationInput | BlogPostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BlogPosts.
     */
    cursor?: BlogPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlogPosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlogPosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BlogPosts.
     */
    distinct?: BlogPostScalarFieldEnum | BlogPostScalarFieldEnum[]
  }

  /**
   * BlogPost findMany
   */
  export type BlogPostFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * Filter, which BlogPosts to fetch.
     */
    where?: BlogPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlogPosts to fetch.
     */
    orderBy?: BlogPostOrderByWithRelationInput | BlogPostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BlogPosts.
     */
    cursor?: BlogPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlogPosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlogPosts.
     */
    skip?: number
    distinct?: BlogPostScalarFieldEnum | BlogPostScalarFieldEnum[]
  }

  /**
   * BlogPost create
   */
  export type BlogPostCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * The data needed to create a BlogPost.
     */
    data: XOR<BlogPostCreateInput, BlogPostUncheckedCreateInput>
  }

  /**
   * BlogPost createMany
   */
  export type BlogPostCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BlogPosts.
     */
    data: BlogPostCreateManyInput | BlogPostCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BlogPost createManyAndReturn
   */
  export type BlogPostCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many BlogPosts.
     */
    data: BlogPostCreateManyInput | BlogPostCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BlogPost update
   */
  export type BlogPostUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * The data needed to update a BlogPost.
     */
    data: XOR<BlogPostUpdateInput, BlogPostUncheckedUpdateInput>
    /**
     * Choose, which BlogPost to update.
     */
    where: BlogPostWhereUniqueInput
  }

  /**
   * BlogPost updateMany
   */
  export type BlogPostUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BlogPosts.
     */
    data: XOR<BlogPostUpdateManyMutationInput, BlogPostUncheckedUpdateManyInput>
    /**
     * Filter which BlogPosts to update
     */
    where?: BlogPostWhereInput
  }

  /**
   * BlogPost upsert
   */
  export type BlogPostUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * The filter to search for the BlogPost to update in case it exists.
     */
    where: BlogPostWhereUniqueInput
    /**
     * In case the BlogPost found by the `where` argument doesn't exist, create a new BlogPost with this data.
     */
    create: XOR<BlogPostCreateInput, BlogPostUncheckedCreateInput>
    /**
     * In case the BlogPost was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BlogPostUpdateInput, BlogPostUncheckedUpdateInput>
  }

  /**
   * BlogPost delete
   */
  export type BlogPostDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * Filter which BlogPost to delete.
     */
    where: BlogPostWhereUniqueInput
  }

  /**
   * BlogPost deleteMany
   */
  export type BlogPostDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BlogPosts to delete
     */
    where?: BlogPostWhereInput
  }

  /**
   * BlogPost without action
   */
  export type BlogPostDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
  }


  /**
   * Model ForeignListing
   */

  export type AggregateForeignListing = {
    _count: ForeignListingCountAggregateOutputType | null
    _avg: ForeignListingAvgAggregateOutputType | null
    _sum: ForeignListingSumAggregateOutputType | null
    _min: ForeignListingMinAggregateOutputType | null
    _max: ForeignListingMaxAggregateOutputType | null
  }

  export type ForeignListingAvgAggregateOutputType = {
    id: number | null
    year: number | null
    price: number | null
  }

  export type ForeignListingSumAggregateOutputType = {
    id: number | null
    year: number | null
    price: number | null
  }

  export type ForeignListingMinAggregateOutputType = {
    id: number | null
    brand: string | null
    model: string | null
    year: number | null
    price: number | null
    pdfUrl: string | null
    category: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ForeignListingMaxAggregateOutputType = {
    id: number | null
    brand: string | null
    model: string | null
    year: number | null
    price: number | null
    pdfUrl: string | null
    category: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ForeignListingCountAggregateOutputType = {
    id: number
    brand: number
    model: number
    year: number
    price: number
    pdfUrl: number
    category: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ForeignListingAvgAggregateInputType = {
    id?: true
    year?: true
    price?: true
  }

  export type ForeignListingSumAggregateInputType = {
    id?: true
    year?: true
    price?: true
  }

  export type ForeignListingMinAggregateInputType = {
    id?: true
    brand?: true
    model?: true
    year?: true
    price?: true
    pdfUrl?: true
    category?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ForeignListingMaxAggregateInputType = {
    id?: true
    brand?: true
    model?: true
    year?: true
    price?: true
    pdfUrl?: true
    category?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ForeignListingCountAggregateInputType = {
    id?: true
    brand?: true
    model?: true
    year?: true
    price?: true
    pdfUrl?: true
    category?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ForeignListingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ForeignListing to aggregate.
     */
    where?: ForeignListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ForeignListings to fetch.
     */
    orderBy?: ForeignListingOrderByWithRelationInput | ForeignListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ForeignListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ForeignListings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ForeignListings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ForeignListings
    **/
    _count?: true | ForeignListingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ForeignListingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ForeignListingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ForeignListingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ForeignListingMaxAggregateInputType
  }

  export type GetForeignListingAggregateType<T extends ForeignListingAggregateArgs> = {
        [P in keyof T & keyof AggregateForeignListing]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateForeignListing[P]>
      : GetScalarType<T[P], AggregateForeignListing[P]>
  }




  export type ForeignListingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ForeignListingWhereInput
    orderBy?: ForeignListingOrderByWithAggregationInput | ForeignListingOrderByWithAggregationInput[]
    by: ForeignListingScalarFieldEnum[] | ForeignListingScalarFieldEnum
    having?: ForeignListingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ForeignListingCountAggregateInputType | true
    _avg?: ForeignListingAvgAggregateInputType
    _sum?: ForeignListingSumAggregateInputType
    _min?: ForeignListingMinAggregateInputType
    _max?: ForeignListingMaxAggregateInputType
  }

  export type ForeignListingGroupByOutputType = {
    id: number
    brand: string
    model: string
    year: number
    price: number
    pdfUrl: string
    category: string
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: ForeignListingCountAggregateOutputType | null
    _avg: ForeignListingAvgAggregateOutputType | null
    _sum: ForeignListingSumAggregateOutputType | null
    _min: ForeignListingMinAggregateOutputType | null
    _max: ForeignListingMaxAggregateOutputType | null
  }

  type GetForeignListingGroupByPayload<T extends ForeignListingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ForeignListingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ForeignListingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ForeignListingGroupByOutputType[P]>
            : GetScalarType<T[P], ForeignListingGroupByOutputType[P]>
        }
      >
    >


  export type ForeignListingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    brand?: boolean
    model?: boolean
    year?: boolean
    price?: boolean
    pdfUrl?: boolean
    category?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["foreignListing"]>

  export type ForeignListingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    brand?: boolean
    model?: boolean
    year?: boolean
    price?: boolean
    pdfUrl?: boolean
    category?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["foreignListing"]>

  export type ForeignListingSelectScalar = {
    id?: boolean
    brand?: boolean
    model?: boolean
    year?: boolean
    price?: boolean
    pdfUrl?: boolean
    category?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $ForeignListingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ForeignListing"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      brand: string
      model: string
      year: number
      price: number
      pdfUrl: string
      category: string
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["foreignListing"]>
    composites: {}
  }

  type ForeignListingGetPayload<S extends boolean | null | undefined | ForeignListingDefaultArgs> = $Result.GetResult<Prisma.$ForeignListingPayload, S>

  type ForeignListingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ForeignListingFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ForeignListingCountAggregateInputType | true
    }

  export interface ForeignListingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ForeignListing'], meta: { name: 'ForeignListing' } }
    /**
     * Find zero or one ForeignListing that matches the filter.
     * @param {ForeignListingFindUniqueArgs} args - Arguments to find a ForeignListing
     * @example
     * // Get one ForeignListing
     * const foreignListing = await prisma.foreignListing.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ForeignListingFindUniqueArgs>(args: SelectSubset<T, ForeignListingFindUniqueArgs<ExtArgs>>): Prisma__ForeignListingClient<$Result.GetResult<Prisma.$ForeignListingPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ForeignListing that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ForeignListingFindUniqueOrThrowArgs} args - Arguments to find a ForeignListing
     * @example
     * // Get one ForeignListing
     * const foreignListing = await prisma.foreignListing.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ForeignListingFindUniqueOrThrowArgs>(args: SelectSubset<T, ForeignListingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ForeignListingClient<$Result.GetResult<Prisma.$ForeignListingPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ForeignListing that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForeignListingFindFirstArgs} args - Arguments to find a ForeignListing
     * @example
     * // Get one ForeignListing
     * const foreignListing = await prisma.foreignListing.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ForeignListingFindFirstArgs>(args?: SelectSubset<T, ForeignListingFindFirstArgs<ExtArgs>>): Prisma__ForeignListingClient<$Result.GetResult<Prisma.$ForeignListingPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ForeignListing that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForeignListingFindFirstOrThrowArgs} args - Arguments to find a ForeignListing
     * @example
     * // Get one ForeignListing
     * const foreignListing = await prisma.foreignListing.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ForeignListingFindFirstOrThrowArgs>(args?: SelectSubset<T, ForeignListingFindFirstOrThrowArgs<ExtArgs>>): Prisma__ForeignListingClient<$Result.GetResult<Prisma.$ForeignListingPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ForeignListings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForeignListingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ForeignListings
     * const foreignListings = await prisma.foreignListing.findMany()
     * 
     * // Get first 10 ForeignListings
     * const foreignListings = await prisma.foreignListing.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const foreignListingWithIdOnly = await prisma.foreignListing.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ForeignListingFindManyArgs>(args?: SelectSubset<T, ForeignListingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ForeignListingPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ForeignListing.
     * @param {ForeignListingCreateArgs} args - Arguments to create a ForeignListing.
     * @example
     * // Create one ForeignListing
     * const ForeignListing = await prisma.foreignListing.create({
     *   data: {
     *     // ... data to create a ForeignListing
     *   }
     * })
     * 
     */
    create<T extends ForeignListingCreateArgs>(args: SelectSubset<T, ForeignListingCreateArgs<ExtArgs>>): Prisma__ForeignListingClient<$Result.GetResult<Prisma.$ForeignListingPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ForeignListings.
     * @param {ForeignListingCreateManyArgs} args - Arguments to create many ForeignListings.
     * @example
     * // Create many ForeignListings
     * const foreignListing = await prisma.foreignListing.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ForeignListingCreateManyArgs>(args?: SelectSubset<T, ForeignListingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ForeignListings and returns the data saved in the database.
     * @param {ForeignListingCreateManyAndReturnArgs} args - Arguments to create many ForeignListings.
     * @example
     * // Create many ForeignListings
     * const foreignListing = await prisma.foreignListing.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ForeignListings and only return the `id`
     * const foreignListingWithIdOnly = await prisma.foreignListing.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ForeignListingCreateManyAndReturnArgs>(args?: SelectSubset<T, ForeignListingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ForeignListingPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ForeignListing.
     * @param {ForeignListingDeleteArgs} args - Arguments to delete one ForeignListing.
     * @example
     * // Delete one ForeignListing
     * const ForeignListing = await prisma.foreignListing.delete({
     *   where: {
     *     // ... filter to delete one ForeignListing
     *   }
     * })
     * 
     */
    delete<T extends ForeignListingDeleteArgs>(args: SelectSubset<T, ForeignListingDeleteArgs<ExtArgs>>): Prisma__ForeignListingClient<$Result.GetResult<Prisma.$ForeignListingPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ForeignListing.
     * @param {ForeignListingUpdateArgs} args - Arguments to update one ForeignListing.
     * @example
     * // Update one ForeignListing
     * const foreignListing = await prisma.foreignListing.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ForeignListingUpdateArgs>(args: SelectSubset<T, ForeignListingUpdateArgs<ExtArgs>>): Prisma__ForeignListingClient<$Result.GetResult<Prisma.$ForeignListingPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ForeignListings.
     * @param {ForeignListingDeleteManyArgs} args - Arguments to filter ForeignListings to delete.
     * @example
     * // Delete a few ForeignListings
     * const { count } = await prisma.foreignListing.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ForeignListingDeleteManyArgs>(args?: SelectSubset<T, ForeignListingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ForeignListings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForeignListingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ForeignListings
     * const foreignListing = await prisma.foreignListing.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ForeignListingUpdateManyArgs>(args: SelectSubset<T, ForeignListingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ForeignListing.
     * @param {ForeignListingUpsertArgs} args - Arguments to update or create a ForeignListing.
     * @example
     * // Update or create a ForeignListing
     * const foreignListing = await prisma.foreignListing.upsert({
     *   create: {
     *     // ... data to create a ForeignListing
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ForeignListing we want to update
     *   }
     * })
     */
    upsert<T extends ForeignListingUpsertArgs>(args: SelectSubset<T, ForeignListingUpsertArgs<ExtArgs>>): Prisma__ForeignListingClient<$Result.GetResult<Prisma.$ForeignListingPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ForeignListings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForeignListingCountArgs} args - Arguments to filter ForeignListings to count.
     * @example
     * // Count the number of ForeignListings
     * const count = await prisma.foreignListing.count({
     *   where: {
     *     // ... the filter for the ForeignListings we want to count
     *   }
     * })
    **/
    count<T extends ForeignListingCountArgs>(
      args?: Subset<T, ForeignListingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ForeignListingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ForeignListing.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForeignListingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ForeignListingAggregateArgs>(args: Subset<T, ForeignListingAggregateArgs>): Prisma.PrismaPromise<GetForeignListingAggregateType<T>>

    /**
     * Group by ForeignListing.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForeignListingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ForeignListingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ForeignListingGroupByArgs['orderBy'] }
        : { orderBy?: ForeignListingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ForeignListingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetForeignListingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ForeignListing model
   */
  readonly fields: ForeignListingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ForeignListing.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ForeignListingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ForeignListing model
   */ 
  interface ForeignListingFieldRefs {
    readonly id: FieldRef<"ForeignListing", 'Int'>
    readonly brand: FieldRef<"ForeignListing", 'String'>
    readonly model: FieldRef<"ForeignListing", 'String'>
    readonly year: FieldRef<"ForeignListing", 'Int'>
    readonly price: FieldRef<"ForeignListing", 'Float'>
    readonly pdfUrl: FieldRef<"ForeignListing", 'String'>
    readonly category: FieldRef<"ForeignListing", 'String'>
    readonly isActive: FieldRef<"ForeignListing", 'Boolean'>
    readonly createdAt: FieldRef<"ForeignListing", 'DateTime'>
    readonly updatedAt: FieldRef<"ForeignListing", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ForeignListing findUnique
   */
  export type ForeignListingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForeignListing
     */
    select?: ForeignListingSelect<ExtArgs> | null
    /**
     * Filter, which ForeignListing to fetch.
     */
    where: ForeignListingWhereUniqueInput
  }

  /**
   * ForeignListing findUniqueOrThrow
   */
  export type ForeignListingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForeignListing
     */
    select?: ForeignListingSelect<ExtArgs> | null
    /**
     * Filter, which ForeignListing to fetch.
     */
    where: ForeignListingWhereUniqueInput
  }

  /**
   * ForeignListing findFirst
   */
  export type ForeignListingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForeignListing
     */
    select?: ForeignListingSelect<ExtArgs> | null
    /**
     * Filter, which ForeignListing to fetch.
     */
    where?: ForeignListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ForeignListings to fetch.
     */
    orderBy?: ForeignListingOrderByWithRelationInput | ForeignListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ForeignListings.
     */
    cursor?: ForeignListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ForeignListings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ForeignListings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ForeignListings.
     */
    distinct?: ForeignListingScalarFieldEnum | ForeignListingScalarFieldEnum[]
  }

  /**
   * ForeignListing findFirstOrThrow
   */
  export type ForeignListingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForeignListing
     */
    select?: ForeignListingSelect<ExtArgs> | null
    /**
     * Filter, which ForeignListing to fetch.
     */
    where?: ForeignListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ForeignListings to fetch.
     */
    orderBy?: ForeignListingOrderByWithRelationInput | ForeignListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ForeignListings.
     */
    cursor?: ForeignListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ForeignListings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ForeignListings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ForeignListings.
     */
    distinct?: ForeignListingScalarFieldEnum | ForeignListingScalarFieldEnum[]
  }

  /**
   * ForeignListing findMany
   */
  export type ForeignListingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForeignListing
     */
    select?: ForeignListingSelect<ExtArgs> | null
    /**
     * Filter, which ForeignListings to fetch.
     */
    where?: ForeignListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ForeignListings to fetch.
     */
    orderBy?: ForeignListingOrderByWithRelationInput | ForeignListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ForeignListings.
     */
    cursor?: ForeignListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ForeignListings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ForeignListings.
     */
    skip?: number
    distinct?: ForeignListingScalarFieldEnum | ForeignListingScalarFieldEnum[]
  }

  /**
   * ForeignListing create
   */
  export type ForeignListingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForeignListing
     */
    select?: ForeignListingSelect<ExtArgs> | null
    /**
     * The data needed to create a ForeignListing.
     */
    data: XOR<ForeignListingCreateInput, ForeignListingUncheckedCreateInput>
  }

  /**
   * ForeignListing createMany
   */
  export type ForeignListingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ForeignListings.
     */
    data: ForeignListingCreateManyInput | ForeignListingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ForeignListing createManyAndReturn
   */
  export type ForeignListingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForeignListing
     */
    select?: ForeignListingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ForeignListings.
     */
    data: ForeignListingCreateManyInput | ForeignListingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ForeignListing update
   */
  export type ForeignListingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForeignListing
     */
    select?: ForeignListingSelect<ExtArgs> | null
    /**
     * The data needed to update a ForeignListing.
     */
    data: XOR<ForeignListingUpdateInput, ForeignListingUncheckedUpdateInput>
    /**
     * Choose, which ForeignListing to update.
     */
    where: ForeignListingWhereUniqueInput
  }

  /**
   * ForeignListing updateMany
   */
  export type ForeignListingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ForeignListings.
     */
    data: XOR<ForeignListingUpdateManyMutationInput, ForeignListingUncheckedUpdateManyInput>
    /**
     * Filter which ForeignListings to update
     */
    where?: ForeignListingWhereInput
  }

  /**
   * ForeignListing upsert
   */
  export type ForeignListingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForeignListing
     */
    select?: ForeignListingSelect<ExtArgs> | null
    /**
     * The filter to search for the ForeignListing to update in case it exists.
     */
    where: ForeignListingWhereUniqueInput
    /**
     * In case the ForeignListing found by the `where` argument doesn't exist, create a new ForeignListing with this data.
     */
    create: XOR<ForeignListingCreateInput, ForeignListingUncheckedCreateInput>
    /**
     * In case the ForeignListing was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ForeignListingUpdateInput, ForeignListingUncheckedUpdateInput>
  }

  /**
   * ForeignListing delete
   */
  export type ForeignListingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForeignListing
     */
    select?: ForeignListingSelect<ExtArgs> | null
    /**
     * Filter which ForeignListing to delete.
     */
    where: ForeignListingWhereUniqueInput
  }

  /**
   * ForeignListing deleteMany
   */
  export type ForeignListingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ForeignListings to delete
     */
    where?: ForeignListingWhereInput
  }

  /**
   * ForeignListing without action
   */
  export type ForeignListingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForeignListing
     */
    select?: ForeignListingSelect<ExtArgs> | null
  }


  /**
   * Model FaqCategory
   */

  export type AggregateFaqCategory = {
    _count: FaqCategoryCountAggregateOutputType | null
    _avg: FaqCategoryAvgAggregateOutputType | null
    _sum: FaqCategorySumAggregateOutputType | null
    _min: FaqCategoryMinAggregateOutputType | null
    _max: FaqCategoryMaxAggregateOutputType | null
  }

  export type FaqCategoryAvgAggregateOutputType = {
    id: number | null
    order: number | null
  }

  export type FaqCategorySumAggregateOutputType = {
    id: number | null
    order: number | null
  }

  export type FaqCategoryMinAggregateOutputType = {
    id: number | null
    site: $Enums.SiteType | null
    title: string | null
    order: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FaqCategoryMaxAggregateOutputType = {
    id: number | null
    site: $Enums.SiteType | null
    title: string | null
    order: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FaqCategoryCountAggregateOutputType = {
    id: number
    site: number
    title: number
    order: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FaqCategoryAvgAggregateInputType = {
    id?: true
    order?: true
  }

  export type FaqCategorySumAggregateInputType = {
    id?: true
    order?: true
  }

  export type FaqCategoryMinAggregateInputType = {
    id?: true
    site?: true
    title?: true
    order?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FaqCategoryMaxAggregateInputType = {
    id?: true
    site?: true
    title?: true
    order?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FaqCategoryCountAggregateInputType = {
    id?: true
    site?: true
    title?: true
    order?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FaqCategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FaqCategory to aggregate.
     */
    where?: FaqCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FaqCategories to fetch.
     */
    orderBy?: FaqCategoryOrderByWithRelationInput | FaqCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FaqCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FaqCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FaqCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FaqCategories
    **/
    _count?: true | FaqCategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FaqCategoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FaqCategorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FaqCategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FaqCategoryMaxAggregateInputType
  }

  export type GetFaqCategoryAggregateType<T extends FaqCategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateFaqCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFaqCategory[P]>
      : GetScalarType<T[P], AggregateFaqCategory[P]>
  }




  export type FaqCategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FaqCategoryWhereInput
    orderBy?: FaqCategoryOrderByWithAggregationInput | FaqCategoryOrderByWithAggregationInput[]
    by: FaqCategoryScalarFieldEnum[] | FaqCategoryScalarFieldEnum
    having?: FaqCategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FaqCategoryCountAggregateInputType | true
    _avg?: FaqCategoryAvgAggregateInputType
    _sum?: FaqCategorySumAggregateInputType
    _min?: FaqCategoryMinAggregateInputType
    _max?: FaqCategoryMaxAggregateInputType
  }

  export type FaqCategoryGroupByOutputType = {
    id: number
    site: $Enums.SiteType
    title: string
    order: number
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: FaqCategoryCountAggregateOutputType | null
    _avg: FaqCategoryAvgAggregateOutputType | null
    _sum: FaqCategorySumAggregateOutputType | null
    _min: FaqCategoryMinAggregateOutputType | null
    _max: FaqCategoryMaxAggregateOutputType | null
  }

  type GetFaqCategoryGroupByPayload<T extends FaqCategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FaqCategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FaqCategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FaqCategoryGroupByOutputType[P]>
            : GetScalarType<T[P], FaqCategoryGroupByOutputType[P]>
        }
      >
    >


  export type FaqCategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    site?: boolean
    title?: boolean
    order?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    items?: boolean | FaqCategory$itemsArgs<ExtArgs>
    _count?: boolean | FaqCategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["faqCategory"]>

  export type FaqCategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    site?: boolean
    title?: boolean
    order?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["faqCategory"]>

  export type FaqCategorySelectScalar = {
    id?: boolean
    site?: boolean
    title?: boolean
    order?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type FaqCategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | FaqCategory$itemsArgs<ExtArgs>
    _count?: boolean | FaqCategoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type FaqCategoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $FaqCategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FaqCategory"
    objects: {
      items: Prisma.$FaqItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      site: $Enums.SiteType
      title: string
      order: number
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["faqCategory"]>
    composites: {}
  }

  type FaqCategoryGetPayload<S extends boolean | null | undefined | FaqCategoryDefaultArgs> = $Result.GetResult<Prisma.$FaqCategoryPayload, S>

  type FaqCategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<FaqCategoryFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: FaqCategoryCountAggregateInputType | true
    }

  export interface FaqCategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FaqCategory'], meta: { name: 'FaqCategory' } }
    /**
     * Find zero or one FaqCategory that matches the filter.
     * @param {FaqCategoryFindUniqueArgs} args - Arguments to find a FaqCategory
     * @example
     * // Get one FaqCategory
     * const faqCategory = await prisma.faqCategory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FaqCategoryFindUniqueArgs>(args: SelectSubset<T, FaqCategoryFindUniqueArgs<ExtArgs>>): Prisma__FaqCategoryClient<$Result.GetResult<Prisma.$FaqCategoryPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one FaqCategory that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {FaqCategoryFindUniqueOrThrowArgs} args - Arguments to find a FaqCategory
     * @example
     * // Get one FaqCategory
     * const faqCategory = await prisma.faqCategory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FaqCategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, FaqCategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FaqCategoryClient<$Result.GetResult<Prisma.$FaqCategoryPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first FaqCategory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FaqCategoryFindFirstArgs} args - Arguments to find a FaqCategory
     * @example
     * // Get one FaqCategory
     * const faqCategory = await prisma.faqCategory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FaqCategoryFindFirstArgs>(args?: SelectSubset<T, FaqCategoryFindFirstArgs<ExtArgs>>): Prisma__FaqCategoryClient<$Result.GetResult<Prisma.$FaqCategoryPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first FaqCategory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FaqCategoryFindFirstOrThrowArgs} args - Arguments to find a FaqCategory
     * @example
     * // Get one FaqCategory
     * const faqCategory = await prisma.faqCategory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FaqCategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, FaqCategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__FaqCategoryClient<$Result.GetResult<Prisma.$FaqCategoryPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more FaqCategories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FaqCategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FaqCategories
     * const faqCategories = await prisma.faqCategory.findMany()
     * 
     * // Get first 10 FaqCategories
     * const faqCategories = await prisma.faqCategory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const faqCategoryWithIdOnly = await prisma.faqCategory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FaqCategoryFindManyArgs>(args?: SelectSubset<T, FaqCategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FaqCategoryPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a FaqCategory.
     * @param {FaqCategoryCreateArgs} args - Arguments to create a FaqCategory.
     * @example
     * // Create one FaqCategory
     * const FaqCategory = await prisma.faqCategory.create({
     *   data: {
     *     // ... data to create a FaqCategory
     *   }
     * })
     * 
     */
    create<T extends FaqCategoryCreateArgs>(args: SelectSubset<T, FaqCategoryCreateArgs<ExtArgs>>): Prisma__FaqCategoryClient<$Result.GetResult<Prisma.$FaqCategoryPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many FaqCategories.
     * @param {FaqCategoryCreateManyArgs} args - Arguments to create many FaqCategories.
     * @example
     * // Create many FaqCategories
     * const faqCategory = await prisma.faqCategory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FaqCategoryCreateManyArgs>(args?: SelectSubset<T, FaqCategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FaqCategories and returns the data saved in the database.
     * @param {FaqCategoryCreateManyAndReturnArgs} args - Arguments to create many FaqCategories.
     * @example
     * // Create many FaqCategories
     * const faqCategory = await prisma.faqCategory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FaqCategories and only return the `id`
     * const faqCategoryWithIdOnly = await prisma.faqCategory.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FaqCategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, FaqCategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FaqCategoryPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a FaqCategory.
     * @param {FaqCategoryDeleteArgs} args - Arguments to delete one FaqCategory.
     * @example
     * // Delete one FaqCategory
     * const FaqCategory = await prisma.faqCategory.delete({
     *   where: {
     *     // ... filter to delete one FaqCategory
     *   }
     * })
     * 
     */
    delete<T extends FaqCategoryDeleteArgs>(args: SelectSubset<T, FaqCategoryDeleteArgs<ExtArgs>>): Prisma__FaqCategoryClient<$Result.GetResult<Prisma.$FaqCategoryPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one FaqCategory.
     * @param {FaqCategoryUpdateArgs} args - Arguments to update one FaqCategory.
     * @example
     * // Update one FaqCategory
     * const faqCategory = await prisma.faqCategory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FaqCategoryUpdateArgs>(args: SelectSubset<T, FaqCategoryUpdateArgs<ExtArgs>>): Prisma__FaqCategoryClient<$Result.GetResult<Prisma.$FaqCategoryPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more FaqCategories.
     * @param {FaqCategoryDeleteManyArgs} args - Arguments to filter FaqCategories to delete.
     * @example
     * // Delete a few FaqCategories
     * const { count } = await prisma.faqCategory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FaqCategoryDeleteManyArgs>(args?: SelectSubset<T, FaqCategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FaqCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FaqCategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FaqCategories
     * const faqCategory = await prisma.faqCategory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FaqCategoryUpdateManyArgs>(args: SelectSubset<T, FaqCategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one FaqCategory.
     * @param {FaqCategoryUpsertArgs} args - Arguments to update or create a FaqCategory.
     * @example
     * // Update or create a FaqCategory
     * const faqCategory = await prisma.faqCategory.upsert({
     *   create: {
     *     // ... data to create a FaqCategory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FaqCategory we want to update
     *   }
     * })
     */
    upsert<T extends FaqCategoryUpsertArgs>(args: SelectSubset<T, FaqCategoryUpsertArgs<ExtArgs>>): Prisma__FaqCategoryClient<$Result.GetResult<Prisma.$FaqCategoryPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of FaqCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FaqCategoryCountArgs} args - Arguments to filter FaqCategories to count.
     * @example
     * // Count the number of FaqCategories
     * const count = await prisma.faqCategory.count({
     *   where: {
     *     // ... the filter for the FaqCategories we want to count
     *   }
     * })
    **/
    count<T extends FaqCategoryCountArgs>(
      args?: Subset<T, FaqCategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FaqCategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FaqCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FaqCategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FaqCategoryAggregateArgs>(args: Subset<T, FaqCategoryAggregateArgs>): Prisma.PrismaPromise<GetFaqCategoryAggregateType<T>>

    /**
     * Group by FaqCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FaqCategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FaqCategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FaqCategoryGroupByArgs['orderBy'] }
        : { orderBy?: FaqCategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FaqCategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFaqCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FaqCategory model
   */
  readonly fields: FaqCategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FaqCategory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FaqCategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    items<T extends FaqCategory$itemsArgs<ExtArgs> = {}>(args?: Subset<T, FaqCategory$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FaqItemPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FaqCategory model
   */ 
  interface FaqCategoryFieldRefs {
    readonly id: FieldRef<"FaqCategory", 'Int'>
    readonly site: FieldRef<"FaqCategory", 'SiteType'>
    readonly title: FieldRef<"FaqCategory", 'String'>
    readonly order: FieldRef<"FaqCategory", 'Int'>
    readonly isActive: FieldRef<"FaqCategory", 'Boolean'>
    readonly createdAt: FieldRef<"FaqCategory", 'DateTime'>
    readonly updatedAt: FieldRef<"FaqCategory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FaqCategory findUnique
   */
  export type FaqCategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FaqCategory
     */
    select?: FaqCategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FaqCategoryInclude<ExtArgs> | null
    /**
     * Filter, which FaqCategory to fetch.
     */
    where: FaqCategoryWhereUniqueInput
  }

  /**
   * FaqCategory findUniqueOrThrow
   */
  export type FaqCategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FaqCategory
     */
    select?: FaqCategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FaqCategoryInclude<ExtArgs> | null
    /**
     * Filter, which FaqCategory to fetch.
     */
    where: FaqCategoryWhereUniqueInput
  }

  /**
   * FaqCategory findFirst
   */
  export type FaqCategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FaqCategory
     */
    select?: FaqCategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FaqCategoryInclude<ExtArgs> | null
    /**
     * Filter, which FaqCategory to fetch.
     */
    where?: FaqCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FaqCategories to fetch.
     */
    orderBy?: FaqCategoryOrderByWithRelationInput | FaqCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FaqCategories.
     */
    cursor?: FaqCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FaqCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FaqCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FaqCategories.
     */
    distinct?: FaqCategoryScalarFieldEnum | FaqCategoryScalarFieldEnum[]
  }

  /**
   * FaqCategory findFirstOrThrow
   */
  export type FaqCategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FaqCategory
     */
    select?: FaqCategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FaqCategoryInclude<ExtArgs> | null
    /**
     * Filter, which FaqCategory to fetch.
     */
    where?: FaqCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FaqCategories to fetch.
     */
    orderBy?: FaqCategoryOrderByWithRelationInput | FaqCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FaqCategories.
     */
    cursor?: FaqCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FaqCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FaqCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FaqCategories.
     */
    distinct?: FaqCategoryScalarFieldEnum | FaqCategoryScalarFieldEnum[]
  }

  /**
   * FaqCategory findMany
   */
  export type FaqCategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FaqCategory
     */
    select?: FaqCategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FaqCategoryInclude<ExtArgs> | null
    /**
     * Filter, which FaqCategories to fetch.
     */
    where?: FaqCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FaqCategories to fetch.
     */
    orderBy?: FaqCategoryOrderByWithRelationInput | FaqCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FaqCategories.
     */
    cursor?: FaqCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FaqCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FaqCategories.
     */
    skip?: number
    distinct?: FaqCategoryScalarFieldEnum | FaqCategoryScalarFieldEnum[]
  }

  /**
   * FaqCategory create
   */
  export type FaqCategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FaqCategory
     */
    select?: FaqCategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FaqCategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a FaqCategory.
     */
    data: XOR<FaqCategoryCreateInput, FaqCategoryUncheckedCreateInput>
  }

  /**
   * FaqCategory createMany
   */
  export type FaqCategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FaqCategories.
     */
    data: FaqCategoryCreateManyInput | FaqCategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FaqCategory createManyAndReturn
   */
  export type FaqCategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FaqCategory
     */
    select?: FaqCategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many FaqCategories.
     */
    data: FaqCategoryCreateManyInput | FaqCategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FaqCategory update
   */
  export type FaqCategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FaqCategory
     */
    select?: FaqCategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FaqCategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a FaqCategory.
     */
    data: XOR<FaqCategoryUpdateInput, FaqCategoryUncheckedUpdateInput>
    /**
     * Choose, which FaqCategory to update.
     */
    where: FaqCategoryWhereUniqueInput
  }

  /**
   * FaqCategory updateMany
   */
  export type FaqCategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FaqCategories.
     */
    data: XOR<FaqCategoryUpdateManyMutationInput, FaqCategoryUncheckedUpdateManyInput>
    /**
     * Filter which FaqCategories to update
     */
    where?: FaqCategoryWhereInput
  }

  /**
   * FaqCategory upsert
   */
  export type FaqCategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FaqCategory
     */
    select?: FaqCategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FaqCategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the FaqCategory to update in case it exists.
     */
    where: FaqCategoryWhereUniqueInput
    /**
     * In case the FaqCategory found by the `where` argument doesn't exist, create a new FaqCategory with this data.
     */
    create: XOR<FaqCategoryCreateInput, FaqCategoryUncheckedCreateInput>
    /**
     * In case the FaqCategory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FaqCategoryUpdateInput, FaqCategoryUncheckedUpdateInput>
  }

  /**
   * FaqCategory delete
   */
  export type FaqCategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FaqCategory
     */
    select?: FaqCategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FaqCategoryInclude<ExtArgs> | null
    /**
     * Filter which FaqCategory to delete.
     */
    where: FaqCategoryWhereUniqueInput
  }

  /**
   * FaqCategory deleteMany
   */
  export type FaqCategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FaqCategories to delete
     */
    where?: FaqCategoryWhereInput
  }

  /**
   * FaqCategory.items
   */
  export type FaqCategory$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FaqItem
     */
    select?: FaqItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FaqItemInclude<ExtArgs> | null
    where?: FaqItemWhereInput
    orderBy?: FaqItemOrderByWithRelationInput | FaqItemOrderByWithRelationInput[]
    cursor?: FaqItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FaqItemScalarFieldEnum | FaqItemScalarFieldEnum[]
  }

  /**
   * FaqCategory without action
   */
  export type FaqCategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FaqCategory
     */
    select?: FaqCategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FaqCategoryInclude<ExtArgs> | null
  }


  /**
   * Model FaqItem
   */

  export type AggregateFaqItem = {
    _count: FaqItemCountAggregateOutputType | null
    _avg: FaqItemAvgAggregateOutputType | null
    _sum: FaqItemSumAggregateOutputType | null
    _min: FaqItemMinAggregateOutputType | null
    _max: FaqItemMaxAggregateOutputType | null
  }

  export type FaqItemAvgAggregateOutputType = {
    id: number | null
    categoryId: number | null
    order: number | null
  }

  export type FaqItemSumAggregateOutputType = {
    id: number | null
    categoryId: number | null
    order: number | null
  }

  export type FaqItemMinAggregateOutputType = {
    id: number | null
    categoryId: number | null
    question: string | null
    answer: string | null
    order: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FaqItemMaxAggregateOutputType = {
    id: number | null
    categoryId: number | null
    question: string | null
    answer: string | null
    order: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FaqItemCountAggregateOutputType = {
    id: number
    categoryId: number
    question: number
    answer: number
    order: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FaqItemAvgAggregateInputType = {
    id?: true
    categoryId?: true
    order?: true
  }

  export type FaqItemSumAggregateInputType = {
    id?: true
    categoryId?: true
    order?: true
  }

  export type FaqItemMinAggregateInputType = {
    id?: true
    categoryId?: true
    question?: true
    answer?: true
    order?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FaqItemMaxAggregateInputType = {
    id?: true
    categoryId?: true
    question?: true
    answer?: true
    order?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FaqItemCountAggregateInputType = {
    id?: true
    categoryId?: true
    question?: true
    answer?: true
    order?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FaqItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FaqItem to aggregate.
     */
    where?: FaqItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FaqItems to fetch.
     */
    orderBy?: FaqItemOrderByWithRelationInput | FaqItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FaqItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FaqItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FaqItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FaqItems
    **/
    _count?: true | FaqItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FaqItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FaqItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FaqItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FaqItemMaxAggregateInputType
  }

  export type GetFaqItemAggregateType<T extends FaqItemAggregateArgs> = {
        [P in keyof T & keyof AggregateFaqItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFaqItem[P]>
      : GetScalarType<T[P], AggregateFaqItem[P]>
  }




  export type FaqItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FaqItemWhereInput
    orderBy?: FaqItemOrderByWithAggregationInput | FaqItemOrderByWithAggregationInput[]
    by: FaqItemScalarFieldEnum[] | FaqItemScalarFieldEnum
    having?: FaqItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FaqItemCountAggregateInputType | true
    _avg?: FaqItemAvgAggregateInputType
    _sum?: FaqItemSumAggregateInputType
    _min?: FaqItemMinAggregateInputType
    _max?: FaqItemMaxAggregateInputType
  }

  export type FaqItemGroupByOutputType = {
    id: number
    categoryId: number
    question: string
    answer: string
    order: number
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: FaqItemCountAggregateOutputType | null
    _avg: FaqItemAvgAggregateOutputType | null
    _sum: FaqItemSumAggregateOutputType | null
    _min: FaqItemMinAggregateOutputType | null
    _max: FaqItemMaxAggregateOutputType | null
  }

  type GetFaqItemGroupByPayload<T extends FaqItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FaqItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FaqItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FaqItemGroupByOutputType[P]>
            : GetScalarType<T[P], FaqItemGroupByOutputType[P]>
        }
      >
    >


  export type FaqItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    categoryId?: boolean
    question?: boolean
    answer?: boolean
    order?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    category?: boolean | FaqCategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["faqItem"]>

  export type FaqItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    categoryId?: boolean
    question?: boolean
    answer?: boolean
    order?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    category?: boolean | FaqCategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["faqItem"]>

  export type FaqItemSelectScalar = {
    id?: boolean
    categoryId?: boolean
    question?: boolean
    answer?: boolean
    order?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type FaqItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | FaqCategoryDefaultArgs<ExtArgs>
  }
  export type FaqItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | FaqCategoryDefaultArgs<ExtArgs>
  }

  export type $FaqItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FaqItem"
    objects: {
      category: Prisma.$FaqCategoryPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      categoryId: number
      question: string
      answer: string
      order: number
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["faqItem"]>
    composites: {}
  }

  type FaqItemGetPayload<S extends boolean | null | undefined | FaqItemDefaultArgs> = $Result.GetResult<Prisma.$FaqItemPayload, S>

  type FaqItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<FaqItemFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: FaqItemCountAggregateInputType | true
    }

  export interface FaqItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FaqItem'], meta: { name: 'FaqItem' } }
    /**
     * Find zero or one FaqItem that matches the filter.
     * @param {FaqItemFindUniqueArgs} args - Arguments to find a FaqItem
     * @example
     * // Get one FaqItem
     * const faqItem = await prisma.faqItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FaqItemFindUniqueArgs>(args: SelectSubset<T, FaqItemFindUniqueArgs<ExtArgs>>): Prisma__FaqItemClient<$Result.GetResult<Prisma.$FaqItemPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one FaqItem that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {FaqItemFindUniqueOrThrowArgs} args - Arguments to find a FaqItem
     * @example
     * // Get one FaqItem
     * const faqItem = await prisma.faqItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FaqItemFindUniqueOrThrowArgs>(args: SelectSubset<T, FaqItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FaqItemClient<$Result.GetResult<Prisma.$FaqItemPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first FaqItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FaqItemFindFirstArgs} args - Arguments to find a FaqItem
     * @example
     * // Get one FaqItem
     * const faqItem = await prisma.faqItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FaqItemFindFirstArgs>(args?: SelectSubset<T, FaqItemFindFirstArgs<ExtArgs>>): Prisma__FaqItemClient<$Result.GetResult<Prisma.$FaqItemPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first FaqItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FaqItemFindFirstOrThrowArgs} args - Arguments to find a FaqItem
     * @example
     * // Get one FaqItem
     * const faqItem = await prisma.faqItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FaqItemFindFirstOrThrowArgs>(args?: SelectSubset<T, FaqItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__FaqItemClient<$Result.GetResult<Prisma.$FaqItemPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more FaqItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FaqItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FaqItems
     * const faqItems = await prisma.faqItem.findMany()
     * 
     * // Get first 10 FaqItems
     * const faqItems = await prisma.faqItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const faqItemWithIdOnly = await prisma.faqItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FaqItemFindManyArgs>(args?: SelectSubset<T, FaqItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FaqItemPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a FaqItem.
     * @param {FaqItemCreateArgs} args - Arguments to create a FaqItem.
     * @example
     * // Create one FaqItem
     * const FaqItem = await prisma.faqItem.create({
     *   data: {
     *     // ... data to create a FaqItem
     *   }
     * })
     * 
     */
    create<T extends FaqItemCreateArgs>(args: SelectSubset<T, FaqItemCreateArgs<ExtArgs>>): Prisma__FaqItemClient<$Result.GetResult<Prisma.$FaqItemPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many FaqItems.
     * @param {FaqItemCreateManyArgs} args - Arguments to create many FaqItems.
     * @example
     * // Create many FaqItems
     * const faqItem = await prisma.faqItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FaqItemCreateManyArgs>(args?: SelectSubset<T, FaqItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FaqItems and returns the data saved in the database.
     * @param {FaqItemCreateManyAndReturnArgs} args - Arguments to create many FaqItems.
     * @example
     * // Create many FaqItems
     * const faqItem = await prisma.faqItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FaqItems and only return the `id`
     * const faqItemWithIdOnly = await prisma.faqItem.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FaqItemCreateManyAndReturnArgs>(args?: SelectSubset<T, FaqItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FaqItemPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a FaqItem.
     * @param {FaqItemDeleteArgs} args - Arguments to delete one FaqItem.
     * @example
     * // Delete one FaqItem
     * const FaqItem = await prisma.faqItem.delete({
     *   where: {
     *     // ... filter to delete one FaqItem
     *   }
     * })
     * 
     */
    delete<T extends FaqItemDeleteArgs>(args: SelectSubset<T, FaqItemDeleteArgs<ExtArgs>>): Prisma__FaqItemClient<$Result.GetResult<Prisma.$FaqItemPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one FaqItem.
     * @param {FaqItemUpdateArgs} args - Arguments to update one FaqItem.
     * @example
     * // Update one FaqItem
     * const faqItem = await prisma.faqItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FaqItemUpdateArgs>(args: SelectSubset<T, FaqItemUpdateArgs<ExtArgs>>): Prisma__FaqItemClient<$Result.GetResult<Prisma.$FaqItemPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more FaqItems.
     * @param {FaqItemDeleteManyArgs} args - Arguments to filter FaqItems to delete.
     * @example
     * // Delete a few FaqItems
     * const { count } = await prisma.faqItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FaqItemDeleteManyArgs>(args?: SelectSubset<T, FaqItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FaqItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FaqItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FaqItems
     * const faqItem = await prisma.faqItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FaqItemUpdateManyArgs>(args: SelectSubset<T, FaqItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one FaqItem.
     * @param {FaqItemUpsertArgs} args - Arguments to update or create a FaqItem.
     * @example
     * // Update or create a FaqItem
     * const faqItem = await prisma.faqItem.upsert({
     *   create: {
     *     // ... data to create a FaqItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FaqItem we want to update
     *   }
     * })
     */
    upsert<T extends FaqItemUpsertArgs>(args: SelectSubset<T, FaqItemUpsertArgs<ExtArgs>>): Prisma__FaqItemClient<$Result.GetResult<Prisma.$FaqItemPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of FaqItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FaqItemCountArgs} args - Arguments to filter FaqItems to count.
     * @example
     * // Count the number of FaqItems
     * const count = await prisma.faqItem.count({
     *   where: {
     *     // ... the filter for the FaqItems we want to count
     *   }
     * })
    **/
    count<T extends FaqItemCountArgs>(
      args?: Subset<T, FaqItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FaqItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FaqItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FaqItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FaqItemAggregateArgs>(args: Subset<T, FaqItemAggregateArgs>): Prisma.PrismaPromise<GetFaqItemAggregateType<T>>

    /**
     * Group by FaqItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FaqItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FaqItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FaqItemGroupByArgs['orderBy'] }
        : { orderBy?: FaqItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FaqItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFaqItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FaqItem model
   */
  readonly fields: FaqItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FaqItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FaqItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    category<T extends FaqCategoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FaqCategoryDefaultArgs<ExtArgs>>): Prisma__FaqCategoryClient<$Result.GetResult<Prisma.$FaqCategoryPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FaqItem model
   */ 
  interface FaqItemFieldRefs {
    readonly id: FieldRef<"FaqItem", 'Int'>
    readonly categoryId: FieldRef<"FaqItem", 'Int'>
    readonly question: FieldRef<"FaqItem", 'String'>
    readonly answer: FieldRef<"FaqItem", 'String'>
    readonly order: FieldRef<"FaqItem", 'Int'>
    readonly isActive: FieldRef<"FaqItem", 'Boolean'>
    readonly createdAt: FieldRef<"FaqItem", 'DateTime'>
    readonly updatedAt: FieldRef<"FaqItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FaqItem findUnique
   */
  export type FaqItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FaqItem
     */
    select?: FaqItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FaqItemInclude<ExtArgs> | null
    /**
     * Filter, which FaqItem to fetch.
     */
    where: FaqItemWhereUniqueInput
  }

  /**
   * FaqItem findUniqueOrThrow
   */
  export type FaqItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FaqItem
     */
    select?: FaqItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FaqItemInclude<ExtArgs> | null
    /**
     * Filter, which FaqItem to fetch.
     */
    where: FaqItemWhereUniqueInput
  }

  /**
   * FaqItem findFirst
   */
  export type FaqItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FaqItem
     */
    select?: FaqItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FaqItemInclude<ExtArgs> | null
    /**
     * Filter, which FaqItem to fetch.
     */
    where?: FaqItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FaqItems to fetch.
     */
    orderBy?: FaqItemOrderByWithRelationInput | FaqItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FaqItems.
     */
    cursor?: FaqItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FaqItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FaqItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FaqItems.
     */
    distinct?: FaqItemScalarFieldEnum | FaqItemScalarFieldEnum[]
  }

  /**
   * FaqItem findFirstOrThrow
   */
  export type FaqItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FaqItem
     */
    select?: FaqItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FaqItemInclude<ExtArgs> | null
    /**
     * Filter, which FaqItem to fetch.
     */
    where?: FaqItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FaqItems to fetch.
     */
    orderBy?: FaqItemOrderByWithRelationInput | FaqItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FaqItems.
     */
    cursor?: FaqItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FaqItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FaqItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FaqItems.
     */
    distinct?: FaqItemScalarFieldEnum | FaqItemScalarFieldEnum[]
  }

  /**
   * FaqItem findMany
   */
  export type FaqItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FaqItem
     */
    select?: FaqItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FaqItemInclude<ExtArgs> | null
    /**
     * Filter, which FaqItems to fetch.
     */
    where?: FaqItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FaqItems to fetch.
     */
    orderBy?: FaqItemOrderByWithRelationInput | FaqItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FaqItems.
     */
    cursor?: FaqItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FaqItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FaqItems.
     */
    skip?: number
    distinct?: FaqItemScalarFieldEnum | FaqItemScalarFieldEnum[]
  }

  /**
   * FaqItem create
   */
  export type FaqItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FaqItem
     */
    select?: FaqItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FaqItemInclude<ExtArgs> | null
    /**
     * The data needed to create a FaqItem.
     */
    data: XOR<FaqItemCreateInput, FaqItemUncheckedCreateInput>
  }

  /**
   * FaqItem createMany
   */
  export type FaqItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FaqItems.
     */
    data: FaqItemCreateManyInput | FaqItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FaqItem createManyAndReturn
   */
  export type FaqItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FaqItem
     */
    select?: FaqItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many FaqItems.
     */
    data: FaqItemCreateManyInput | FaqItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FaqItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * FaqItem update
   */
  export type FaqItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FaqItem
     */
    select?: FaqItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FaqItemInclude<ExtArgs> | null
    /**
     * The data needed to update a FaqItem.
     */
    data: XOR<FaqItemUpdateInput, FaqItemUncheckedUpdateInput>
    /**
     * Choose, which FaqItem to update.
     */
    where: FaqItemWhereUniqueInput
  }

  /**
   * FaqItem updateMany
   */
  export type FaqItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FaqItems.
     */
    data: XOR<FaqItemUpdateManyMutationInput, FaqItemUncheckedUpdateManyInput>
    /**
     * Filter which FaqItems to update
     */
    where?: FaqItemWhereInput
  }

  /**
   * FaqItem upsert
   */
  export type FaqItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FaqItem
     */
    select?: FaqItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FaqItemInclude<ExtArgs> | null
    /**
     * The filter to search for the FaqItem to update in case it exists.
     */
    where: FaqItemWhereUniqueInput
    /**
     * In case the FaqItem found by the `where` argument doesn't exist, create a new FaqItem with this data.
     */
    create: XOR<FaqItemCreateInput, FaqItemUncheckedCreateInput>
    /**
     * In case the FaqItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FaqItemUpdateInput, FaqItemUncheckedUpdateInput>
  }

  /**
   * FaqItem delete
   */
  export type FaqItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FaqItem
     */
    select?: FaqItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FaqItemInclude<ExtArgs> | null
    /**
     * Filter which FaqItem to delete.
     */
    where: FaqItemWhereUniqueInput
  }

  /**
   * FaqItem deleteMany
   */
  export type FaqItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FaqItems to delete
     */
    where?: FaqItemWhereInput
  }

  /**
   * FaqItem without action
   */
  export type FaqItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FaqItem
     */
    select?: FaqItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FaqItemInclude<ExtArgs> | null
  }


  /**
   * Model NewsletterSubscriber
   */

  export type AggregateNewsletterSubscriber = {
    _count: NewsletterSubscriberCountAggregateOutputType | null
    _min: NewsletterSubscriberMinAggregateOutputType | null
    _max: NewsletterSubscriberMaxAggregateOutputType | null
  }

  export type NewsletterSubscriberMinAggregateOutputType = {
    id: string | null
    email: string | null
    createdAt: Date | null
  }

  export type NewsletterSubscriberMaxAggregateOutputType = {
    id: string | null
    email: string | null
    createdAt: Date | null
  }

  export type NewsletterSubscriberCountAggregateOutputType = {
    id: number
    email: number
    createdAt: number
    _all: number
  }


  export type NewsletterSubscriberMinAggregateInputType = {
    id?: true
    email?: true
    createdAt?: true
  }

  export type NewsletterSubscriberMaxAggregateInputType = {
    id?: true
    email?: true
    createdAt?: true
  }

  export type NewsletterSubscriberCountAggregateInputType = {
    id?: true
    email?: true
    createdAt?: true
    _all?: true
  }

  export type NewsletterSubscriberAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NewsletterSubscriber to aggregate.
     */
    where?: NewsletterSubscriberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NewsletterSubscribers to fetch.
     */
    orderBy?: NewsletterSubscriberOrderByWithRelationInput | NewsletterSubscriberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NewsletterSubscriberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NewsletterSubscribers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NewsletterSubscribers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned NewsletterSubscribers
    **/
    _count?: true | NewsletterSubscriberCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NewsletterSubscriberMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NewsletterSubscriberMaxAggregateInputType
  }

  export type GetNewsletterSubscriberAggregateType<T extends NewsletterSubscriberAggregateArgs> = {
        [P in keyof T & keyof AggregateNewsletterSubscriber]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNewsletterSubscriber[P]>
      : GetScalarType<T[P], AggregateNewsletterSubscriber[P]>
  }




  export type NewsletterSubscriberGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NewsletterSubscriberWhereInput
    orderBy?: NewsletterSubscriberOrderByWithAggregationInput | NewsletterSubscriberOrderByWithAggregationInput[]
    by: NewsletterSubscriberScalarFieldEnum[] | NewsletterSubscriberScalarFieldEnum
    having?: NewsletterSubscriberScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NewsletterSubscriberCountAggregateInputType | true
    _min?: NewsletterSubscriberMinAggregateInputType
    _max?: NewsletterSubscriberMaxAggregateInputType
  }

  export type NewsletterSubscriberGroupByOutputType = {
    id: string
    email: string
    createdAt: Date
    _count: NewsletterSubscriberCountAggregateOutputType | null
    _min: NewsletterSubscriberMinAggregateOutputType | null
    _max: NewsletterSubscriberMaxAggregateOutputType | null
  }

  type GetNewsletterSubscriberGroupByPayload<T extends NewsletterSubscriberGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NewsletterSubscriberGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NewsletterSubscriberGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NewsletterSubscriberGroupByOutputType[P]>
            : GetScalarType<T[P], NewsletterSubscriberGroupByOutputType[P]>
        }
      >
    >


  export type NewsletterSubscriberSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["newsletterSubscriber"]>

  export type NewsletterSubscriberSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["newsletterSubscriber"]>

  export type NewsletterSubscriberSelectScalar = {
    id?: boolean
    email?: boolean
    createdAt?: boolean
  }


  export type $NewsletterSubscriberPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "NewsletterSubscriber"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      createdAt: Date
    }, ExtArgs["result"]["newsletterSubscriber"]>
    composites: {}
  }

  type NewsletterSubscriberGetPayload<S extends boolean | null | undefined | NewsletterSubscriberDefaultArgs> = $Result.GetResult<Prisma.$NewsletterSubscriberPayload, S>

  type NewsletterSubscriberCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<NewsletterSubscriberFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: NewsletterSubscriberCountAggregateInputType | true
    }

  export interface NewsletterSubscriberDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['NewsletterSubscriber'], meta: { name: 'NewsletterSubscriber' } }
    /**
     * Find zero or one NewsletterSubscriber that matches the filter.
     * @param {NewsletterSubscriberFindUniqueArgs} args - Arguments to find a NewsletterSubscriber
     * @example
     * // Get one NewsletterSubscriber
     * const newsletterSubscriber = await prisma.newsletterSubscriber.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NewsletterSubscriberFindUniqueArgs>(args: SelectSubset<T, NewsletterSubscriberFindUniqueArgs<ExtArgs>>): Prisma__NewsletterSubscriberClient<$Result.GetResult<Prisma.$NewsletterSubscriberPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one NewsletterSubscriber that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {NewsletterSubscriberFindUniqueOrThrowArgs} args - Arguments to find a NewsletterSubscriber
     * @example
     * // Get one NewsletterSubscriber
     * const newsletterSubscriber = await prisma.newsletterSubscriber.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NewsletterSubscriberFindUniqueOrThrowArgs>(args: SelectSubset<T, NewsletterSubscriberFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NewsletterSubscriberClient<$Result.GetResult<Prisma.$NewsletterSubscriberPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first NewsletterSubscriber that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsletterSubscriberFindFirstArgs} args - Arguments to find a NewsletterSubscriber
     * @example
     * // Get one NewsletterSubscriber
     * const newsletterSubscriber = await prisma.newsletterSubscriber.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NewsletterSubscriberFindFirstArgs>(args?: SelectSubset<T, NewsletterSubscriberFindFirstArgs<ExtArgs>>): Prisma__NewsletterSubscriberClient<$Result.GetResult<Prisma.$NewsletterSubscriberPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first NewsletterSubscriber that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsletterSubscriberFindFirstOrThrowArgs} args - Arguments to find a NewsletterSubscriber
     * @example
     * // Get one NewsletterSubscriber
     * const newsletterSubscriber = await prisma.newsletterSubscriber.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NewsletterSubscriberFindFirstOrThrowArgs>(args?: SelectSubset<T, NewsletterSubscriberFindFirstOrThrowArgs<ExtArgs>>): Prisma__NewsletterSubscriberClient<$Result.GetResult<Prisma.$NewsletterSubscriberPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more NewsletterSubscribers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsletterSubscriberFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NewsletterSubscribers
     * const newsletterSubscribers = await prisma.newsletterSubscriber.findMany()
     * 
     * // Get first 10 NewsletterSubscribers
     * const newsletterSubscribers = await prisma.newsletterSubscriber.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const newsletterSubscriberWithIdOnly = await prisma.newsletterSubscriber.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NewsletterSubscriberFindManyArgs>(args?: SelectSubset<T, NewsletterSubscriberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NewsletterSubscriberPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a NewsletterSubscriber.
     * @param {NewsletterSubscriberCreateArgs} args - Arguments to create a NewsletterSubscriber.
     * @example
     * // Create one NewsletterSubscriber
     * const NewsletterSubscriber = await prisma.newsletterSubscriber.create({
     *   data: {
     *     // ... data to create a NewsletterSubscriber
     *   }
     * })
     * 
     */
    create<T extends NewsletterSubscriberCreateArgs>(args: SelectSubset<T, NewsletterSubscriberCreateArgs<ExtArgs>>): Prisma__NewsletterSubscriberClient<$Result.GetResult<Prisma.$NewsletterSubscriberPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many NewsletterSubscribers.
     * @param {NewsletterSubscriberCreateManyArgs} args - Arguments to create many NewsletterSubscribers.
     * @example
     * // Create many NewsletterSubscribers
     * const newsletterSubscriber = await prisma.newsletterSubscriber.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NewsletterSubscriberCreateManyArgs>(args?: SelectSubset<T, NewsletterSubscriberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many NewsletterSubscribers and returns the data saved in the database.
     * @param {NewsletterSubscriberCreateManyAndReturnArgs} args - Arguments to create many NewsletterSubscribers.
     * @example
     * // Create many NewsletterSubscribers
     * const newsletterSubscriber = await prisma.newsletterSubscriber.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many NewsletterSubscribers and only return the `id`
     * const newsletterSubscriberWithIdOnly = await prisma.newsletterSubscriber.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NewsletterSubscriberCreateManyAndReturnArgs>(args?: SelectSubset<T, NewsletterSubscriberCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NewsletterSubscriberPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a NewsletterSubscriber.
     * @param {NewsletterSubscriberDeleteArgs} args - Arguments to delete one NewsletterSubscriber.
     * @example
     * // Delete one NewsletterSubscriber
     * const NewsletterSubscriber = await prisma.newsletterSubscriber.delete({
     *   where: {
     *     // ... filter to delete one NewsletterSubscriber
     *   }
     * })
     * 
     */
    delete<T extends NewsletterSubscriberDeleteArgs>(args: SelectSubset<T, NewsletterSubscriberDeleteArgs<ExtArgs>>): Prisma__NewsletterSubscriberClient<$Result.GetResult<Prisma.$NewsletterSubscriberPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one NewsletterSubscriber.
     * @param {NewsletterSubscriberUpdateArgs} args - Arguments to update one NewsletterSubscriber.
     * @example
     * // Update one NewsletterSubscriber
     * const newsletterSubscriber = await prisma.newsletterSubscriber.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NewsletterSubscriberUpdateArgs>(args: SelectSubset<T, NewsletterSubscriberUpdateArgs<ExtArgs>>): Prisma__NewsletterSubscriberClient<$Result.GetResult<Prisma.$NewsletterSubscriberPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more NewsletterSubscribers.
     * @param {NewsletterSubscriberDeleteManyArgs} args - Arguments to filter NewsletterSubscribers to delete.
     * @example
     * // Delete a few NewsletterSubscribers
     * const { count } = await prisma.newsletterSubscriber.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NewsletterSubscriberDeleteManyArgs>(args?: SelectSubset<T, NewsletterSubscriberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NewsletterSubscribers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsletterSubscriberUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NewsletterSubscribers
     * const newsletterSubscriber = await prisma.newsletterSubscriber.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NewsletterSubscriberUpdateManyArgs>(args: SelectSubset<T, NewsletterSubscriberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one NewsletterSubscriber.
     * @param {NewsletterSubscriberUpsertArgs} args - Arguments to update or create a NewsletterSubscriber.
     * @example
     * // Update or create a NewsletterSubscriber
     * const newsletterSubscriber = await prisma.newsletterSubscriber.upsert({
     *   create: {
     *     // ... data to create a NewsletterSubscriber
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NewsletterSubscriber we want to update
     *   }
     * })
     */
    upsert<T extends NewsletterSubscriberUpsertArgs>(args: SelectSubset<T, NewsletterSubscriberUpsertArgs<ExtArgs>>): Prisma__NewsletterSubscriberClient<$Result.GetResult<Prisma.$NewsletterSubscriberPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of NewsletterSubscribers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsletterSubscriberCountArgs} args - Arguments to filter NewsletterSubscribers to count.
     * @example
     * // Count the number of NewsletterSubscribers
     * const count = await prisma.newsletterSubscriber.count({
     *   where: {
     *     // ... the filter for the NewsletterSubscribers we want to count
     *   }
     * })
    **/
    count<T extends NewsletterSubscriberCountArgs>(
      args?: Subset<T, NewsletterSubscriberCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NewsletterSubscriberCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a NewsletterSubscriber.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsletterSubscriberAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NewsletterSubscriberAggregateArgs>(args: Subset<T, NewsletterSubscriberAggregateArgs>): Prisma.PrismaPromise<GetNewsletterSubscriberAggregateType<T>>

    /**
     * Group by NewsletterSubscriber.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsletterSubscriberGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NewsletterSubscriberGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NewsletterSubscriberGroupByArgs['orderBy'] }
        : { orderBy?: NewsletterSubscriberGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NewsletterSubscriberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNewsletterSubscriberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the NewsletterSubscriber model
   */
  readonly fields: NewsletterSubscriberFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for NewsletterSubscriber.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NewsletterSubscriberClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the NewsletterSubscriber model
   */ 
  interface NewsletterSubscriberFieldRefs {
    readonly id: FieldRef<"NewsletterSubscriber", 'String'>
    readonly email: FieldRef<"NewsletterSubscriber", 'String'>
    readonly createdAt: FieldRef<"NewsletterSubscriber", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * NewsletterSubscriber findUnique
   */
  export type NewsletterSubscriberFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterSubscriber
     */
    select?: NewsletterSubscriberSelect<ExtArgs> | null
    /**
     * Filter, which NewsletterSubscriber to fetch.
     */
    where: NewsletterSubscriberWhereUniqueInput
  }

  /**
   * NewsletterSubscriber findUniqueOrThrow
   */
  export type NewsletterSubscriberFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterSubscriber
     */
    select?: NewsletterSubscriberSelect<ExtArgs> | null
    /**
     * Filter, which NewsletterSubscriber to fetch.
     */
    where: NewsletterSubscriberWhereUniqueInput
  }

  /**
   * NewsletterSubscriber findFirst
   */
  export type NewsletterSubscriberFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterSubscriber
     */
    select?: NewsletterSubscriberSelect<ExtArgs> | null
    /**
     * Filter, which NewsletterSubscriber to fetch.
     */
    where?: NewsletterSubscriberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NewsletterSubscribers to fetch.
     */
    orderBy?: NewsletterSubscriberOrderByWithRelationInput | NewsletterSubscriberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NewsletterSubscribers.
     */
    cursor?: NewsletterSubscriberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NewsletterSubscribers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NewsletterSubscribers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NewsletterSubscribers.
     */
    distinct?: NewsletterSubscriberScalarFieldEnum | NewsletterSubscriberScalarFieldEnum[]
  }

  /**
   * NewsletterSubscriber findFirstOrThrow
   */
  export type NewsletterSubscriberFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterSubscriber
     */
    select?: NewsletterSubscriberSelect<ExtArgs> | null
    /**
     * Filter, which NewsletterSubscriber to fetch.
     */
    where?: NewsletterSubscriberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NewsletterSubscribers to fetch.
     */
    orderBy?: NewsletterSubscriberOrderByWithRelationInput | NewsletterSubscriberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NewsletterSubscribers.
     */
    cursor?: NewsletterSubscriberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NewsletterSubscribers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NewsletterSubscribers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NewsletterSubscribers.
     */
    distinct?: NewsletterSubscriberScalarFieldEnum | NewsletterSubscriberScalarFieldEnum[]
  }

  /**
   * NewsletterSubscriber findMany
   */
  export type NewsletterSubscriberFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterSubscriber
     */
    select?: NewsletterSubscriberSelect<ExtArgs> | null
    /**
     * Filter, which NewsletterSubscribers to fetch.
     */
    where?: NewsletterSubscriberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NewsletterSubscribers to fetch.
     */
    orderBy?: NewsletterSubscriberOrderByWithRelationInput | NewsletterSubscriberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing NewsletterSubscribers.
     */
    cursor?: NewsletterSubscriberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NewsletterSubscribers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NewsletterSubscribers.
     */
    skip?: number
    distinct?: NewsletterSubscriberScalarFieldEnum | NewsletterSubscriberScalarFieldEnum[]
  }

  /**
   * NewsletterSubscriber create
   */
  export type NewsletterSubscriberCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterSubscriber
     */
    select?: NewsletterSubscriberSelect<ExtArgs> | null
    /**
     * The data needed to create a NewsletterSubscriber.
     */
    data: XOR<NewsletterSubscriberCreateInput, NewsletterSubscriberUncheckedCreateInput>
  }

  /**
   * NewsletterSubscriber createMany
   */
  export type NewsletterSubscriberCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many NewsletterSubscribers.
     */
    data: NewsletterSubscriberCreateManyInput | NewsletterSubscriberCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NewsletterSubscriber createManyAndReturn
   */
  export type NewsletterSubscriberCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterSubscriber
     */
    select?: NewsletterSubscriberSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many NewsletterSubscribers.
     */
    data: NewsletterSubscriberCreateManyInput | NewsletterSubscriberCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NewsletterSubscriber update
   */
  export type NewsletterSubscriberUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterSubscriber
     */
    select?: NewsletterSubscriberSelect<ExtArgs> | null
    /**
     * The data needed to update a NewsletterSubscriber.
     */
    data: XOR<NewsletterSubscriberUpdateInput, NewsletterSubscriberUncheckedUpdateInput>
    /**
     * Choose, which NewsletterSubscriber to update.
     */
    where: NewsletterSubscriberWhereUniqueInput
  }

  /**
   * NewsletterSubscriber updateMany
   */
  export type NewsletterSubscriberUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update NewsletterSubscribers.
     */
    data: XOR<NewsletterSubscriberUpdateManyMutationInput, NewsletterSubscriberUncheckedUpdateManyInput>
    /**
     * Filter which NewsletterSubscribers to update
     */
    where?: NewsletterSubscriberWhereInput
  }

  /**
   * NewsletterSubscriber upsert
   */
  export type NewsletterSubscriberUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterSubscriber
     */
    select?: NewsletterSubscriberSelect<ExtArgs> | null
    /**
     * The filter to search for the NewsletterSubscriber to update in case it exists.
     */
    where: NewsletterSubscriberWhereUniqueInput
    /**
     * In case the NewsletterSubscriber found by the `where` argument doesn't exist, create a new NewsletterSubscriber with this data.
     */
    create: XOR<NewsletterSubscriberCreateInput, NewsletterSubscriberUncheckedCreateInput>
    /**
     * In case the NewsletterSubscriber was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NewsletterSubscriberUpdateInput, NewsletterSubscriberUncheckedUpdateInput>
  }

  /**
   * NewsletterSubscriber delete
   */
  export type NewsletterSubscriberDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterSubscriber
     */
    select?: NewsletterSubscriberSelect<ExtArgs> | null
    /**
     * Filter which NewsletterSubscriber to delete.
     */
    where: NewsletterSubscriberWhereUniqueInput
  }

  /**
   * NewsletterSubscriber deleteMany
   */
  export type NewsletterSubscriberDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NewsletterSubscribers to delete
     */
    where?: NewsletterSubscriberWhereInput
  }

  /**
   * NewsletterSubscriber without action
   */
  export type NewsletterSubscriberDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterSubscriber
     */
    select?: NewsletterSubscriberSelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const CmsAdminScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    passwordHash: 'passwordHash',
    isActive: 'isActive',
    lastLoginAt: 'lastLoginAt',
    refreshTokenHash: 'refreshTokenHash',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CmsAdminScalarFieldEnum = (typeof CmsAdminScalarFieldEnum)[keyof typeof CmsAdminScalarFieldEnum]


  export const HeroImageScalarFieldEnum: {
    id: 'id',
    site: 'site',
    desktopImage: 'desktopImage',
    mobileImage: 'mobileImage',
    buttonLink: 'buttonLink',
    order: 'order',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type HeroImageScalarFieldEnum = (typeof HeroImageScalarFieldEnum)[keyof typeof HeroImageScalarFieldEnum]


  export const VideoBannerScalarFieldEnum: {
    id: 'id',
    site: 'site',
    videoUrl: 'videoUrl',
    aspectRatio: 'aspectRatio',
    durationSec: 'durationSec',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type VideoBannerScalarFieldEnum = (typeof VideoBannerScalarFieldEnum)[keyof typeof VideoBannerScalarFieldEnum]


  export const GalleryItemScalarFieldEnum: {
    id: 'id',
    site: 'site',
    mediaUrl: 'mediaUrl',
    thumbnailUrl: 'thumbnailUrl',
    title: 'title',
    mediaType: 'mediaType',
    aspectRatio: 'aspectRatio',
    order: 'order',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type GalleryItemScalarFieldEnum = (typeof GalleryItemScalarFieldEnum)[keyof typeof GalleryItemScalarFieldEnum]


  export const BlogPostScalarFieldEnum: {
    id: 'id',
    imageUrl: 'imageUrl',
    imageRatio: 'imageRatio',
    title: 'title',
    author: 'author',
    article: 'article',
    publishedAt: 'publishedAt',
    isPublished: 'isPublished',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BlogPostScalarFieldEnum = (typeof BlogPostScalarFieldEnum)[keyof typeof BlogPostScalarFieldEnum]


  export const ForeignListingScalarFieldEnum: {
    id: 'id',
    brand: 'brand',
    model: 'model',
    year: 'year',
    price: 'price',
    pdfUrl: 'pdfUrl',
    category: 'category',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ForeignListingScalarFieldEnum = (typeof ForeignListingScalarFieldEnum)[keyof typeof ForeignListingScalarFieldEnum]


  export const FaqCategoryScalarFieldEnum: {
    id: 'id',
    site: 'site',
    title: 'title',
    order: 'order',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type FaqCategoryScalarFieldEnum = (typeof FaqCategoryScalarFieldEnum)[keyof typeof FaqCategoryScalarFieldEnum]


  export const FaqItemScalarFieldEnum: {
    id: 'id',
    categoryId: 'categoryId',
    question: 'question',
    answer: 'answer',
    order: 'order',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type FaqItemScalarFieldEnum = (typeof FaqItemScalarFieldEnum)[keyof typeof FaqItemScalarFieldEnum]


  export const NewsletterSubscriberScalarFieldEnum: {
    id: 'id',
    email: 'email',
    createdAt: 'createdAt'
  };

  export type NewsletterSubscriberScalarFieldEnum = (typeof NewsletterSubscriberScalarFieldEnum)[keyof typeof NewsletterSubscriberScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'SiteType'
   */
  export type EnumSiteTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SiteType'>
    


  /**
   * Reference to a field of type 'SiteType[]'
   */
  export type ListEnumSiteTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SiteType[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type CmsAdminWhereInput = {
    AND?: CmsAdminWhereInput | CmsAdminWhereInput[]
    OR?: CmsAdminWhereInput[]
    NOT?: CmsAdminWhereInput | CmsAdminWhereInput[]
    id?: IntFilter<"CmsAdmin"> | number
    name?: StringFilter<"CmsAdmin"> | string
    email?: StringFilter<"CmsAdmin"> | string
    passwordHash?: StringFilter<"CmsAdmin"> | string
    isActive?: BoolFilter<"CmsAdmin"> | boolean
    lastLoginAt?: DateTimeNullableFilter<"CmsAdmin"> | Date | string | null
    refreshTokenHash?: StringNullableFilter<"CmsAdmin"> | string | null
    createdAt?: DateTimeFilter<"CmsAdmin"> | Date | string
    updatedAt?: DateTimeFilter<"CmsAdmin"> | Date | string
  }

  export type CmsAdminOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    isActive?: SortOrder
    lastLoginAt?: SortOrderInput | SortOrder
    refreshTokenHash?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CmsAdminWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: CmsAdminWhereInput | CmsAdminWhereInput[]
    OR?: CmsAdminWhereInput[]
    NOT?: CmsAdminWhereInput | CmsAdminWhereInput[]
    name?: StringFilter<"CmsAdmin"> | string
    passwordHash?: StringFilter<"CmsAdmin"> | string
    isActive?: BoolFilter<"CmsAdmin"> | boolean
    lastLoginAt?: DateTimeNullableFilter<"CmsAdmin"> | Date | string | null
    refreshTokenHash?: StringNullableFilter<"CmsAdmin"> | string | null
    createdAt?: DateTimeFilter<"CmsAdmin"> | Date | string
    updatedAt?: DateTimeFilter<"CmsAdmin"> | Date | string
  }, "id" | "email">

  export type CmsAdminOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    isActive?: SortOrder
    lastLoginAt?: SortOrderInput | SortOrder
    refreshTokenHash?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CmsAdminCountOrderByAggregateInput
    _avg?: CmsAdminAvgOrderByAggregateInput
    _max?: CmsAdminMaxOrderByAggregateInput
    _min?: CmsAdminMinOrderByAggregateInput
    _sum?: CmsAdminSumOrderByAggregateInput
  }

  export type CmsAdminScalarWhereWithAggregatesInput = {
    AND?: CmsAdminScalarWhereWithAggregatesInput | CmsAdminScalarWhereWithAggregatesInput[]
    OR?: CmsAdminScalarWhereWithAggregatesInput[]
    NOT?: CmsAdminScalarWhereWithAggregatesInput | CmsAdminScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"CmsAdmin"> | number
    name?: StringWithAggregatesFilter<"CmsAdmin"> | string
    email?: StringWithAggregatesFilter<"CmsAdmin"> | string
    passwordHash?: StringWithAggregatesFilter<"CmsAdmin"> | string
    isActive?: BoolWithAggregatesFilter<"CmsAdmin"> | boolean
    lastLoginAt?: DateTimeNullableWithAggregatesFilter<"CmsAdmin"> | Date | string | null
    refreshTokenHash?: StringNullableWithAggregatesFilter<"CmsAdmin"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"CmsAdmin"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CmsAdmin"> | Date | string
  }

  export type HeroImageWhereInput = {
    AND?: HeroImageWhereInput | HeroImageWhereInput[]
    OR?: HeroImageWhereInput[]
    NOT?: HeroImageWhereInput | HeroImageWhereInput[]
    id?: IntFilter<"HeroImage"> | number
    site?: EnumSiteTypeFilter<"HeroImage"> | $Enums.SiteType
    desktopImage?: StringFilter<"HeroImage"> | string
    mobileImage?: StringFilter<"HeroImage"> | string
    buttonLink?: StringFilter<"HeroImage"> | string
    order?: IntFilter<"HeroImage"> | number
    isActive?: BoolFilter<"HeroImage"> | boolean
    createdAt?: DateTimeFilter<"HeroImage"> | Date | string
    updatedAt?: DateTimeFilter<"HeroImage"> | Date | string
  }

  export type HeroImageOrderByWithRelationInput = {
    id?: SortOrder
    site?: SortOrder
    desktopImage?: SortOrder
    mobileImage?: SortOrder
    buttonLink?: SortOrder
    order?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HeroImageWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: HeroImageWhereInput | HeroImageWhereInput[]
    OR?: HeroImageWhereInput[]
    NOT?: HeroImageWhereInput | HeroImageWhereInput[]
    site?: EnumSiteTypeFilter<"HeroImage"> | $Enums.SiteType
    desktopImage?: StringFilter<"HeroImage"> | string
    mobileImage?: StringFilter<"HeroImage"> | string
    buttonLink?: StringFilter<"HeroImage"> | string
    order?: IntFilter<"HeroImage"> | number
    isActive?: BoolFilter<"HeroImage"> | boolean
    createdAt?: DateTimeFilter<"HeroImage"> | Date | string
    updatedAt?: DateTimeFilter<"HeroImage"> | Date | string
  }, "id">

  export type HeroImageOrderByWithAggregationInput = {
    id?: SortOrder
    site?: SortOrder
    desktopImage?: SortOrder
    mobileImage?: SortOrder
    buttonLink?: SortOrder
    order?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: HeroImageCountOrderByAggregateInput
    _avg?: HeroImageAvgOrderByAggregateInput
    _max?: HeroImageMaxOrderByAggregateInput
    _min?: HeroImageMinOrderByAggregateInput
    _sum?: HeroImageSumOrderByAggregateInput
  }

  export type HeroImageScalarWhereWithAggregatesInput = {
    AND?: HeroImageScalarWhereWithAggregatesInput | HeroImageScalarWhereWithAggregatesInput[]
    OR?: HeroImageScalarWhereWithAggregatesInput[]
    NOT?: HeroImageScalarWhereWithAggregatesInput | HeroImageScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"HeroImage"> | number
    site?: EnumSiteTypeWithAggregatesFilter<"HeroImage"> | $Enums.SiteType
    desktopImage?: StringWithAggregatesFilter<"HeroImage"> | string
    mobileImage?: StringWithAggregatesFilter<"HeroImage"> | string
    buttonLink?: StringWithAggregatesFilter<"HeroImage"> | string
    order?: IntWithAggregatesFilter<"HeroImage"> | number
    isActive?: BoolWithAggregatesFilter<"HeroImage"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"HeroImage"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"HeroImage"> | Date | string
  }

  export type VideoBannerWhereInput = {
    AND?: VideoBannerWhereInput | VideoBannerWhereInput[]
    OR?: VideoBannerWhereInput[]
    NOT?: VideoBannerWhereInput | VideoBannerWhereInput[]
    id?: IntFilter<"VideoBanner"> | number
    site?: EnumSiteTypeFilter<"VideoBanner"> | $Enums.SiteType
    videoUrl?: StringFilter<"VideoBanner"> | string
    aspectRatio?: StringFilter<"VideoBanner"> | string
    durationSec?: IntNullableFilter<"VideoBanner"> | number | null
    isActive?: BoolFilter<"VideoBanner"> | boolean
    createdAt?: DateTimeFilter<"VideoBanner"> | Date | string
    updatedAt?: DateTimeFilter<"VideoBanner"> | Date | string
  }

  export type VideoBannerOrderByWithRelationInput = {
    id?: SortOrder
    site?: SortOrder
    videoUrl?: SortOrder
    aspectRatio?: SortOrder
    durationSec?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VideoBannerWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: VideoBannerWhereInput | VideoBannerWhereInput[]
    OR?: VideoBannerWhereInput[]
    NOT?: VideoBannerWhereInput | VideoBannerWhereInput[]
    site?: EnumSiteTypeFilter<"VideoBanner"> | $Enums.SiteType
    videoUrl?: StringFilter<"VideoBanner"> | string
    aspectRatio?: StringFilter<"VideoBanner"> | string
    durationSec?: IntNullableFilter<"VideoBanner"> | number | null
    isActive?: BoolFilter<"VideoBanner"> | boolean
    createdAt?: DateTimeFilter<"VideoBanner"> | Date | string
    updatedAt?: DateTimeFilter<"VideoBanner"> | Date | string
  }, "id">

  export type VideoBannerOrderByWithAggregationInput = {
    id?: SortOrder
    site?: SortOrder
    videoUrl?: SortOrder
    aspectRatio?: SortOrder
    durationSec?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: VideoBannerCountOrderByAggregateInput
    _avg?: VideoBannerAvgOrderByAggregateInput
    _max?: VideoBannerMaxOrderByAggregateInput
    _min?: VideoBannerMinOrderByAggregateInput
    _sum?: VideoBannerSumOrderByAggregateInput
  }

  export type VideoBannerScalarWhereWithAggregatesInput = {
    AND?: VideoBannerScalarWhereWithAggregatesInput | VideoBannerScalarWhereWithAggregatesInput[]
    OR?: VideoBannerScalarWhereWithAggregatesInput[]
    NOT?: VideoBannerScalarWhereWithAggregatesInput | VideoBannerScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"VideoBanner"> | number
    site?: EnumSiteTypeWithAggregatesFilter<"VideoBanner"> | $Enums.SiteType
    videoUrl?: StringWithAggregatesFilter<"VideoBanner"> | string
    aspectRatio?: StringWithAggregatesFilter<"VideoBanner"> | string
    durationSec?: IntNullableWithAggregatesFilter<"VideoBanner"> | number | null
    isActive?: BoolWithAggregatesFilter<"VideoBanner"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"VideoBanner"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"VideoBanner"> | Date | string
  }

  export type GalleryItemWhereInput = {
    AND?: GalleryItemWhereInput | GalleryItemWhereInput[]
    OR?: GalleryItemWhereInput[]
    NOT?: GalleryItemWhereInput | GalleryItemWhereInput[]
    id?: IntFilter<"GalleryItem"> | number
    site?: EnumSiteTypeFilter<"GalleryItem"> | $Enums.SiteType
    mediaUrl?: StringFilter<"GalleryItem"> | string
    thumbnailUrl?: StringNullableFilter<"GalleryItem"> | string | null
    title?: StringFilter<"GalleryItem"> | string
    mediaType?: StringFilter<"GalleryItem"> | string
    aspectRatio?: StringFilter<"GalleryItem"> | string
    order?: IntFilter<"GalleryItem"> | number
    isActive?: BoolFilter<"GalleryItem"> | boolean
    createdAt?: DateTimeFilter<"GalleryItem"> | Date | string
    updatedAt?: DateTimeFilter<"GalleryItem"> | Date | string
  }

  export type GalleryItemOrderByWithRelationInput = {
    id?: SortOrder
    site?: SortOrder
    mediaUrl?: SortOrder
    thumbnailUrl?: SortOrderInput | SortOrder
    title?: SortOrder
    mediaType?: SortOrder
    aspectRatio?: SortOrder
    order?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GalleryItemWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: GalleryItemWhereInput | GalleryItemWhereInput[]
    OR?: GalleryItemWhereInput[]
    NOT?: GalleryItemWhereInput | GalleryItemWhereInput[]
    site?: EnumSiteTypeFilter<"GalleryItem"> | $Enums.SiteType
    mediaUrl?: StringFilter<"GalleryItem"> | string
    thumbnailUrl?: StringNullableFilter<"GalleryItem"> | string | null
    title?: StringFilter<"GalleryItem"> | string
    mediaType?: StringFilter<"GalleryItem"> | string
    aspectRatio?: StringFilter<"GalleryItem"> | string
    order?: IntFilter<"GalleryItem"> | number
    isActive?: BoolFilter<"GalleryItem"> | boolean
    createdAt?: DateTimeFilter<"GalleryItem"> | Date | string
    updatedAt?: DateTimeFilter<"GalleryItem"> | Date | string
  }, "id">

  export type GalleryItemOrderByWithAggregationInput = {
    id?: SortOrder
    site?: SortOrder
    mediaUrl?: SortOrder
    thumbnailUrl?: SortOrderInput | SortOrder
    title?: SortOrder
    mediaType?: SortOrder
    aspectRatio?: SortOrder
    order?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: GalleryItemCountOrderByAggregateInput
    _avg?: GalleryItemAvgOrderByAggregateInput
    _max?: GalleryItemMaxOrderByAggregateInput
    _min?: GalleryItemMinOrderByAggregateInput
    _sum?: GalleryItemSumOrderByAggregateInput
  }

  export type GalleryItemScalarWhereWithAggregatesInput = {
    AND?: GalleryItemScalarWhereWithAggregatesInput | GalleryItemScalarWhereWithAggregatesInput[]
    OR?: GalleryItemScalarWhereWithAggregatesInput[]
    NOT?: GalleryItemScalarWhereWithAggregatesInput | GalleryItemScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"GalleryItem"> | number
    site?: EnumSiteTypeWithAggregatesFilter<"GalleryItem"> | $Enums.SiteType
    mediaUrl?: StringWithAggregatesFilter<"GalleryItem"> | string
    thumbnailUrl?: StringNullableWithAggregatesFilter<"GalleryItem"> | string | null
    title?: StringWithAggregatesFilter<"GalleryItem"> | string
    mediaType?: StringWithAggregatesFilter<"GalleryItem"> | string
    aspectRatio?: StringWithAggregatesFilter<"GalleryItem"> | string
    order?: IntWithAggregatesFilter<"GalleryItem"> | number
    isActive?: BoolWithAggregatesFilter<"GalleryItem"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"GalleryItem"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"GalleryItem"> | Date | string
  }

  export type BlogPostWhereInput = {
    AND?: BlogPostWhereInput | BlogPostWhereInput[]
    OR?: BlogPostWhereInput[]
    NOT?: BlogPostWhereInput | BlogPostWhereInput[]
    id?: IntFilter<"BlogPost"> | number
    imageUrl?: StringFilter<"BlogPost"> | string
    imageRatio?: StringFilter<"BlogPost"> | string
    title?: StringFilter<"BlogPost"> | string
    author?: StringFilter<"BlogPost"> | string
    article?: StringFilter<"BlogPost"> | string
    publishedAt?: DateTimeFilter<"BlogPost"> | Date | string
    isPublished?: BoolFilter<"BlogPost"> | boolean
    createdAt?: DateTimeFilter<"BlogPost"> | Date | string
    updatedAt?: DateTimeFilter<"BlogPost"> | Date | string
  }

  export type BlogPostOrderByWithRelationInput = {
    id?: SortOrder
    imageUrl?: SortOrder
    imageRatio?: SortOrder
    title?: SortOrder
    author?: SortOrder
    article?: SortOrder
    publishedAt?: SortOrder
    isPublished?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BlogPostWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: BlogPostWhereInput | BlogPostWhereInput[]
    OR?: BlogPostWhereInput[]
    NOT?: BlogPostWhereInput | BlogPostWhereInput[]
    imageUrl?: StringFilter<"BlogPost"> | string
    imageRatio?: StringFilter<"BlogPost"> | string
    title?: StringFilter<"BlogPost"> | string
    author?: StringFilter<"BlogPost"> | string
    article?: StringFilter<"BlogPost"> | string
    publishedAt?: DateTimeFilter<"BlogPost"> | Date | string
    isPublished?: BoolFilter<"BlogPost"> | boolean
    createdAt?: DateTimeFilter<"BlogPost"> | Date | string
    updatedAt?: DateTimeFilter<"BlogPost"> | Date | string
  }, "id">

  export type BlogPostOrderByWithAggregationInput = {
    id?: SortOrder
    imageUrl?: SortOrder
    imageRatio?: SortOrder
    title?: SortOrder
    author?: SortOrder
    article?: SortOrder
    publishedAt?: SortOrder
    isPublished?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BlogPostCountOrderByAggregateInput
    _avg?: BlogPostAvgOrderByAggregateInput
    _max?: BlogPostMaxOrderByAggregateInput
    _min?: BlogPostMinOrderByAggregateInput
    _sum?: BlogPostSumOrderByAggregateInput
  }

  export type BlogPostScalarWhereWithAggregatesInput = {
    AND?: BlogPostScalarWhereWithAggregatesInput | BlogPostScalarWhereWithAggregatesInput[]
    OR?: BlogPostScalarWhereWithAggregatesInput[]
    NOT?: BlogPostScalarWhereWithAggregatesInput | BlogPostScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"BlogPost"> | number
    imageUrl?: StringWithAggregatesFilter<"BlogPost"> | string
    imageRatio?: StringWithAggregatesFilter<"BlogPost"> | string
    title?: StringWithAggregatesFilter<"BlogPost"> | string
    author?: StringWithAggregatesFilter<"BlogPost"> | string
    article?: StringWithAggregatesFilter<"BlogPost"> | string
    publishedAt?: DateTimeWithAggregatesFilter<"BlogPost"> | Date | string
    isPublished?: BoolWithAggregatesFilter<"BlogPost"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"BlogPost"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"BlogPost"> | Date | string
  }

  export type ForeignListingWhereInput = {
    AND?: ForeignListingWhereInput | ForeignListingWhereInput[]
    OR?: ForeignListingWhereInput[]
    NOT?: ForeignListingWhereInput | ForeignListingWhereInput[]
    id?: IntFilter<"ForeignListing"> | number
    brand?: StringFilter<"ForeignListing"> | string
    model?: StringFilter<"ForeignListing"> | string
    year?: IntFilter<"ForeignListing"> | number
    price?: FloatFilter<"ForeignListing"> | number
    pdfUrl?: StringFilter<"ForeignListing"> | string
    category?: StringFilter<"ForeignListing"> | string
    isActive?: BoolFilter<"ForeignListing"> | boolean
    createdAt?: DateTimeFilter<"ForeignListing"> | Date | string
    updatedAt?: DateTimeFilter<"ForeignListing"> | Date | string
  }

  export type ForeignListingOrderByWithRelationInput = {
    id?: SortOrder
    brand?: SortOrder
    model?: SortOrder
    year?: SortOrder
    price?: SortOrder
    pdfUrl?: SortOrder
    category?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ForeignListingWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ForeignListingWhereInput | ForeignListingWhereInput[]
    OR?: ForeignListingWhereInput[]
    NOT?: ForeignListingWhereInput | ForeignListingWhereInput[]
    brand?: StringFilter<"ForeignListing"> | string
    model?: StringFilter<"ForeignListing"> | string
    year?: IntFilter<"ForeignListing"> | number
    price?: FloatFilter<"ForeignListing"> | number
    pdfUrl?: StringFilter<"ForeignListing"> | string
    category?: StringFilter<"ForeignListing"> | string
    isActive?: BoolFilter<"ForeignListing"> | boolean
    createdAt?: DateTimeFilter<"ForeignListing"> | Date | string
    updatedAt?: DateTimeFilter<"ForeignListing"> | Date | string
  }, "id">

  export type ForeignListingOrderByWithAggregationInput = {
    id?: SortOrder
    brand?: SortOrder
    model?: SortOrder
    year?: SortOrder
    price?: SortOrder
    pdfUrl?: SortOrder
    category?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ForeignListingCountOrderByAggregateInput
    _avg?: ForeignListingAvgOrderByAggregateInput
    _max?: ForeignListingMaxOrderByAggregateInput
    _min?: ForeignListingMinOrderByAggregateInput
    _sum?: ForeignListingSumOrderByAggregateInput
  }

  export type ForeignListingScalarWhereWithAggregatesInput = {
    AND?: ForeignListingScalarWhereWithAggregatesInput | ForeignListingScalarWhereWithAggregatesInput[]
    OR?: ForeignListingScalarWhereWithAggregatesInput[]
    NOT?: ForeignListingScalarWhereWithAggregatesInput | ForeignListingScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ForeignListing"> | number
    brand?: StringWithAggregatesFilter<"ForeignListing"> | string
    model?: StringWithAggregatesFilter<"ForeignListing"> | string
    year?: IntWithAggregatesFilter<"ForeignListing"> | number
    price?: FloatWithAggregatesFilter<"ForeignListing"> | number
    pdfUrl?: StringWithAggregatesFilter<"ForeignListing"> | string
    category?: StringWithAggregatesFilter<"ForeignListing"> | string
    isActive?: BoolWithAggregatesFilter<"ForeignListing"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"ForeignListing"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ForeignListing"> | Date | string
  }

  export type FaqCategoryWhereInput = {
    AND?: FaqCategoryWhereInput | FaqCategoryWhereInput[]
    OR?: FaqCategoryWhereInput[]
    NOT?: FaqCategoryWhereInput | FaqCategoryWhereInput[]
    id?: IntFilter<"FaqCategory"> | number
    site?: EnumSiteTypeFilter<"FaqCategory"> | $Enums.SiteType
    title?: StringFilter<"FaqCategory"> | string
    order?: IntFilter<"FaqCategory"> | number
    isActive?: BoolFilter<"FaqCategory"> | boolean
    createdAt?: DateTimeFilter<"FaqCategory"> | Date | string
    updatedAt?: DateTimeFilter<"FaqCategory"> | Date | string
    items?: FaqItemListRelationFilter
  }

  export type FaqCategoryOrderByWithRelationInput = {
    id?: SortOrder
    site?: SortOrder
    title?: SortOrder
    order?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    items?: FaqItemOrderByRelationAggregateInput
  }

  export type FaqCategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: FaqCategoryWhereInput | FaqCategoryWhereInput[]
    OR?: FaqCategoryWhereInput[]
    NOT?: FaqCategoryWhereInput | FaqCategoryWhereInput[]
    site?: EnumSiteTypeFilter<"FaqCategory"> | $Enums.SiteType
    title?: StringFilter<"FaqCategory"> | string
    order?: IntFilter<"FaqCategory"> | number
    isActive?: BoolFilter<"FaqCategory"> | boolean
    createdAt?: DateTimeFilter<"FaqCategory"> | Date | string
    updatedAt?: DateTimeFilter<"FaqCategory"> | Date | string
    items?: FaqItemListRelationFilter
  }, "id">

  export type FaqCategoryOrderByWithAggregationInput = {
    id?: SortOrder
    site?: SortOrder
    title?: SortOrder
    order?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: FaqCategoryCountOrderByAggregateInput
    _avg?: FaqCategoryAvgOrderByAggregateInput
    _max?: FaqCategoryMaxOrderByAggregateInput
    _min?: FaqCategoryMinOrderByAggregateInput
    _sum?: FaqCategorySumOrderByAggregateInput
  }

  export type FaqCategoryScalarWhereWithAggregatesInput = {
    AND?: FaqCategoryScalarWhereWithAggregatesInput | FaqCategoryScalarWhereWithAggregatesInput[]
    OR?: FaqCategoryScalarWhereWithAggregatesInput[]
    NOT?: FaqCategoryScalarWhereWithAggregatesInput | FaqCategoryScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"FaqCategory"> | number
    site?: EnumSiteTypeWithAggregatesFilter<"FaqCategory"> | $Enums.SiteType
    title?: StringWithAggregatesFilter<"FaqCategory"> | string
    order?: IntWithAggregatesFilter<"FaqCategory"> | number
    isActive?: BoolWithAggregatesFilter<"FaqCategory"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"FaqCategory"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"FaqCategory"> | Date | string
  }

  export type FaqItemWhereInput = {
    AND?: FaqItemWhereInput | FaqItemWhereInput[]
    OR?: FaqItemWhereInput[]
    NOT?: FaqItemWhereInput | FaqItemWhereInput[]
    id?: IntFilter<"FaqItem"> | number
    categoryId?: IntFilter<"FaqItem"> | number
    question?: StringFilter<"FaqItem"> | string
    answer?: StringFilter<"FaqItem"> | string
    order?: IntFilter<"FaqItem"> | number
    isActive?: BoolFilter<"FaqItem"> | boolean
    createdAt?: DateTimeFilter<"FaqItem"> | Date | string
    updatedAt?: DateTimeFilter<"FaqItem"> | Date | string
    category?: XOR<FaqCategoryRelationFilter, FaqCategoryWhereInput>
  }

  export type FaqItemOrderByWithRelationInput = {
    id?: SortOrder
    categoryId?: SortOrder
    question?: SortOrder
    answer?: SortOrder
    order?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    category?: FaqCategoryOrderByWithRelationInput
  }

  export type FaqItemWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: FaqItemWhereInput | FaqItemWhereInput[]
    OR?: FaqItemWhereInput[]
    NOT?: FaqItemWhereInput | FaqItemWhereInput[]
    categoryId?: IntFilter<"FaqItem"> | number
    question?: StringFilter<"FaqItem"> | string
    answer?: StringFilter<"FaqItem"> | string
    order?: IntFilter<"FaqItem"> | number
    isActive?: BoolFilter<"FaqItem"> | boolean
    createdAt?: DateTimeFilter<"FaqItem"> | Date | string
    updatedAt?: DateTimeFilter<"FaqItem"> | Date | string
    category?: XOR<FaqCategoryRelationFilter, FaqCategoryWhereInput>
  }, "id">

  export type FaqItemOrderByWithAggregationInput = {
    id?: SortOrder
    categoryId?: SortOrder
    question?: SortOrder
    answer?: SortOrder
    order?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: FaqItemCountOrderByAggregateInput
    _avg?: FaqItemAvgOrderByAggregateInput
    _max?: FaqItemMaxOrderByAggregateInput
    _min?: FaqItemMinOrderByAggregateInput
    _sum?: FaqItemSumOrderByAggregateInput
  }

  export type FaqItemScalarWhereWithAggregatesInput = {
    AND?: FaqItemScalarWhereWithAggregatesInput | FaqItemScalarWhereWithAggregatesInput[]
    OR?: FaqItemScalarWhereWithAggregatesInput[]
    NOT?: FaqItemScalarWhereWithAggregatesInput | FaqItemScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"FaqItem"> | number
    categoryId?: IntWithAggregatesFilter<"FaqItem"> | number
    question?: StringWithAggregatesFilter<"FaqItem"> | string
    answer?: StringWithAggregatesFilter<"FaqItem"> | string
    order?: IntWithAggregatesFilter<"FaqItem"> | number
    isActive?: BoolWithAggregatesFilter<"FaqItem"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"FaqItem"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"FaqItem"> | Date | string
  }

  export type NewsletterSubscriberWhereInput = {
    AND?: NewsletterSubscriberWhereInput | NewsletterSubscriberWhereInput[]
    OR?: NewsletterSubscriberWhereInput[]
    NOT?: NewsletterSubscriberWhereInput | NewsletterSubscriberWhereInput[]
    id?: StringFilter<"NewsletterSubscriber"> | string
    email?: StringFilter<"NewsletterSubscriber"> | string
    createdAt?: DateTimeFilter<"NewsletterSubscriber"> | Date | string
  }

  export type NewsletterSubscriberOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
  }

  export type NewsletterSubscriberWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: NewsletterSubscriberWhereInput | NewsletterSubscriberWhereInput[]
    OR?: NewsletterSubscriberWhereInput[]
    NOT?: NewsletterSubscriberWhereInput | NewsletterSubscriberWhereInput[]
    createdAt?: DateTimeFilter<"NewsletterSubscriber"> | Date | string
  }, "id" | "email">

  export type NewsletterSubscriberOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
    _count?: NewsletterSubscriberCountOrderByAggregateInput
    _max?: NewsletterSubscriberMaxOrderByAggregateInput
    _min?: NewsletterSubscriberMinOrderByAggregateInput
  }

  export type NewsletterSubscriberScalarWhereWithAggregatesInput = {
    AND?: NewsletterSubscriberScalarWhereWithAggregatesInput | NewsletterSubscriberScalarWhereWithAggregatesInput[]
    OR?: NewsletterSubscriberScalarWhereWithAggregatesInput[]
    NOT?: NewsletterSubscriberScalarWhereWithAggregatesInput | NewsletterSubscriberScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"NewsletterSubscriber"> | string
    email?: StringWithAggregatesFilter<"NewsletterSubscriber"> | string
    createdAt?: DateTimeWithAggregatesFilter<"NewsletterSubscriber"> | Date | string
  }

  export type CmsAdminCreateInput = {
    name: string
    email: string
    passwordHash: string
    isActive?: boolean
    lastLoginAt?: Date | string | null
    refreshTokenHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CmsAdminUncheckedCreateInput = {
    id?: number
    name: string
    email: string
    passwordHash: string
    isActive?: boolean
    lastLoginAt?: Date | string | null
    refreshTokenHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CmsAdminUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CmsAdminUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CmsAdminCreateManyInput = {
    id?: number
    name: string
    email: string
    passwordHash: string
    isActive?: boolean
    lastLoginAt?: Date | string | null
    refreshTokenHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CmsAdminUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CmsAdminUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HeroImageCreateInput = {
    site: $Enums.SiteType
    desktopImage: string
    mobileImage: string
    buttonLink: string
    order?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HeroImageUncheckedCreateInput = {
    id?: number
    site: $Enums.SiteType
    desktopImage: string
    mobileImage: string
    buttonLink: string
    order?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HeroImageUpdateInput = {
    site?: EnumSiteTypeFieldUpdateOperationsInput | $Enums.SiteType
    desktopImage?: StringFieldUpdateOperationsInput | string
    mobileImage?: StringFieldUpdateOperationsInput | string
    buttonLink?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HeroImageUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    site?: EnumSiteTypeFieldUpdateOperationsInput | $Enums.SiteType
    desktopImage?: StringFieldUpdateOperationsInput | string
    mobileImage?: StringFieldUpdateOperationsInput | string
    buttonLink?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HeroImageCreateManyInput = {
    id?: number
    site: $Enums.SiteType
    desktopImage: string
    mobileImage: string
    buttonLink: string
    order?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HeroImageUpdateManyMutationInput = {
    site?: EnumSiteTypeFieldUpdateOperationsInput | $Enums.SiteType
    desktopImage?: StringFieldUpdateOperationsInput | string
    mobileImage?: StringFieldUpdateOperationsInput | string
    buttonLink?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HeroImageUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    site?: EnumSiteTypeFieldUpdateOperationsInput | $Enums.SiteType
    desktopImage?: StringFieldUpdateOperationsInput | string
    mobileImage?: StringFieldUpdateOperationsInput | string
    buttonLink?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VideoBannerCreateInput = {
    site: $Enums.SiteType
    videoUrl: string
    aspectRatio?: string
    durationSec?: number | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VideoBannerUncheckedCreateInput = {
    id?: number
    site: $Enums.SiteType
    videoUrl: string
    aspectRatio?: string
    durationSec?: number | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VideoBannerUpdateInput = {
    site?: EnumSiteTypeFieldUpdateOperationsInput | $Enums.SiteType
    videoUrl?: StringFieldUpdateOperationsInput | string
    aspectRatio?: StringFieldUpdateOperationsInput | string
    durationSec?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VideoBannerUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    site?: EnumSiteTypeFieldUpdateOperationsInput | $Enums.SiteType
    videoUrl?: StringFieldUpdateOperationsInput | string
    aspectRatio?: StringFieldUpdateOperationsInput | string
    durationSec?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VideoBannerCreateManyInput = {
    id?: number
    site: $Enums.SiteType
    videoUrl: string
    aspectRatio?: string
    durationSec?: number | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VideoBannerUpdateManyMutationInput = {
    site?: EnumSiteTypeFieldUpdateOperationsInput | $Enums.SiteType
    videoUrl?: StringFieldUpdateOperationsInput | string
    aspectRatio?: StringFieldUpdateOperationsInput | string
    durationSec?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VideoBannerUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    site?: EnumSiteTypeFieldUpdateOperationsInput | $Enums.SiteType
    videoUrl?: StringFieldUpdateOperationsInput | string
    aspectRatio?: StringFieldUpdateOperationsInput | string
    durationSec?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GalleryItemCreateInput = {
    site: $Enums.SiteType
    mediaUrl: string
    thumbnailUrl?: string | null
    title: string
    mediaType?: string
    aspectRatio?: string
    order?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GalleryItemUncheckedCreateInput = {
    id?: number
    site: $Enums.SiteType
    mediaUrl: string
    thumbnailUrl?: string | null
    title: string
    mediaType?: string
    aspectRatio?: string
    order?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GalleryItemUpdateInput = {
    site?: EnumSiteTypeFieldUpdateOperationsInput | $Enums.SiteType
    mediaUrl?: StringFieldUpdateOperationsInput | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    mediaType?: StringFieldUpdateOperationsInput | string
    aspectRatio?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GalleryItemUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    site?: EnumSiteTypeFieldUpdateOperationsInput | $Enums.SiteType
    mediaUrl?: StringFieldUpdateOperationsInput | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    mediaType?: StringFieldUpdateOperationsInput | string
    aspectRatio?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GalleryItemCreateManyInput = {
    id?: number
    site: $Enums.SiteType
    mediaUrl: string
    thumbnailUrl?: string | null
    title: string
    mediaType?: string
    aspectRatio?: string
    order?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GalleryItemUpdateManyMutationInput = {
    site?: EnumSiteTypeFieldUpdateOperationsInput | $Enums.SiteType
    mediaUrl?: StringFieldUpdateOperationsInput | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    mediaType?: StringFieldUpdateOperationsInput | string
    aspectRatio?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GalleryItemUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    site?: EnumSiteTypeFieldUpdateOperationsInput | $Enums.SiteType
    mediaUrl?: StringFieldUpdateOperationsInput | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    mediaType?: StringFieldUpdateOperationsInput | string
    aspectRatio?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BlogPostCreateInput = {
    imageUrl: string
    imageRatio?: string
    title: string
    author: string
    article: string
    publishedAt?: Date | string
    isPublished?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BlogPostUncheckedCreateInput = {
    id?: number
    imageUrl: string
    imageRatio?: string
    title: string
    author: string
    article: string
    publishedAt?: Date | string
    isPublished?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BlogPostUpdateInput = {
    imageUrl?: StringFieldUpdateOperationsInput | string
    imageRatio?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    article?: StringFieldUpdateOperationsInput | string
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BlogPostUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    imageRatio?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    article?: StringFieldUpdateOperationsInput | string
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BlogPostCreateManyInput = {
    id?: number
    imageUrl: string
    imageRatio?: string
    title: string
    author: string
    article: string
    publishedAt?: Date | string
    isPublished?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BlogPostUpdateManyMutationInput = {
    imageUrl?: StringFieldUpdateOperationsInput | string
    imageRatio?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    article?: StringFieldUpdateOperationsInput | string
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BlogPostUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    imageRatio?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    article?: StringFieldUpdateOperationsInput | string
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ForeignListingCreateInput = {
    brand: string
    model: string
    year: number
    price: number
    pdfUrl: string
    category?: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ForeignListingUncheckedCreateInput = {
    id?: number
    brand: string
    model: string
    year: number
    price: number
    pdfUrl: string
    category?: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ForeignListingUpdateInput = {
    brand?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    pdfUrl?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ForeignListingUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    brand?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    pdfUrl?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ForeignListingCreateManyInput = {
    id?: number
    brand: string
    model: string
    year: number
    price: number
    pdfUrl: string
    category?: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ForeignListingUpdateManyMutationInput = {
    brand?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    pdfUrl?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ForeignListingUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    brand?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    pdfUrl?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FaqCategoryCreateInput = {
    site: $Enums.SiteType
    title: string
    order?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: FaqItemCreateNestedManyWithoutCategoryInput
  }

  export type FaqCategoryUncheckedCreateInput = {
    id?: number
    site: $Enums.SiteType
    title: string
    order?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: FaqItemUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type FaqCategoryUpdateInput = {
    site?: EnumSiteTypeFieldUpdateOperationsInput | $Enums.SiteType
    title?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: FaqItemUpdateManyWithoutCategoryNestedInput
  }

  export type FaqCategoryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    site?: EnumSiteTypeFieldUpdateOperationsInput | $Enums.SiteType
    title?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: FaqItemUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type FaqCategoryCreateManyInput = {
    id?: number
    site: $Enums.SiteType
    title: string
    order?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FaqCategoryUpdateManyMutationInput = {
    site?: EnumSiteTypeFieldUpdateOperationsInput | $Enums.SiteType
    title?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FaqCategoryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    site?: EnumSiteTypeFieldUpdateOperationsInput | $Enums.SiteType
    title?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FaqItemCreateInput = {
    question: string
    answer: string
    order?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    category: FaqCategoryCreateNestedOneWithoutItemsInput
  }

  export type FaqItemUncheckedCreateInput = {
    id?: number
    categoryId: number
    question: string
    answer: string
    order?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FaqItemUpdateInput = {
    question?: StringFieldUpdateOperationsInput | string
    answer?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: FaqCategoryUpdateOneRequiredWithoutItemsNestedInput
  }

  export type FaqItemUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    categoryId?: IntFieldUpdateOperationsInput | number
    question?: StringFieldUpdateOperationsInput | string
    answer?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FaqItemCreateManyInput = {
    id?: number
    categoryId: number
    question: string
    answer: string
    order?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FaqItemUpdateManyMutationInput = {
    question?: StringFieldUpdateOperationsInput | string
    answer?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FaqItemUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    categoryId?: IntFieldUpdateOperationsInput | number
    question?: StringFieldUpdateOperationsInput | string
    answer?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NewsletterSubscriberCreateInput = {
    id?: string
    email: string
    createdAt?: Date | string
  }

  export type NewsletterSubscriberUncheckedCreateInput = {
    id?: string
    email: string
    createdAt?: Date | string
  }

  export type NewsletterSubscriberUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NewsletterSubscriberUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NewsletterSubscriberCreateManyInput = {
    id?: string
    email: string
    createdAt?: Date | string
  }

  export type NewsletterSubscriberUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NewsletterSubscriberUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type CmsAdminCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    isActive?: SortOrder
    lastLoginAt?: SortOrder
    refreshTokenHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CmsAdminAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CmsAdminMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    isActive?: SortOrder
    lastLoginAt?: SortOrder
    refreshTokenHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CmsAdminMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    isActive?: SortOrder
    lastLoginAt?: SortOrder
    refreshTokenHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CmsAdminSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumSiteTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.SiteType | EnumSiteTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SiteType[] | ListEnumSiteTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SiteType[] | ListEnumSiteTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSiteTypeFilter<$PrismaModel> | $Enums.SiteType
  }

  export type HeroImageCountOrderByAggregateInput = {
    id?: SortOrder
    site?: SortOrder
    desktopImage?: SortOrder
    mobileImage?: SortOrder
    buttonLink?: SortOrder
    order?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HeroImageAvgOrderByAggregateInput = {
    id?: SortOrder
    order?: SortOrder
  }

  export type HeroImageMaxOrderByAggregateInput = {
    id?: SortOrder
    site?: SortOrder
    desktopImage?: SortOrder
    mobileImage?: SortOrder
    buttonLink?: SortOrder
    order?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HeroImageMinOrderByAggregateInput = {
    id?: SortOrder
    site?: SortOrder
    desktopImage?: SortOrder
    mobileImage?: SortOrder
    buttonLink?: SortOrder
    order?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HeroImageSumOrderByAggregateInput = {
    id?: SortOrder
    order?: SortOrder
  }

  export type EnumSiteTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SiteType | EnumSiteTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SiteType[] | ListEnumSiteTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SiteType[] | ListEnumSiteTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSiteTypeWithAggregatesFilter<$PrismaModel> | $Enums.SiteType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSiteTypeFilter<$PrismaModel>
    _max?: NestedEnumSiteTypeFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type VideoBannerCountOrderByAggregateInput = {
    id?: SortOrder
    site?: SortOrder
    videoUrl?: SortOrder
    aspectRatio?: SortOrder
    durationSec?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VideoBannerAvgOrderByAggregateInput = {
    id?: SortOrder
    durationSec?: SortOrder
  }

  export type VideoBannerMaxOrderByAggregateInput = {
    id?: SortOrder
    site?: SortOrder
    videoUrl?: SortOrder
    aspectRatio?: SortOrder
    durationSec?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VideoBannerMinOrderByAggregateInput = {
    id?: SortOrder
    site?: SortOrder
    videoUrl?: SortOrder
    aspectRatio?: SortOrder
    durationSec?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VideoBannerSumOrderByAggregateInput = {
    id?: SortOrder
    durationSec?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type GalleryItemCountOrderByAggregateInput = {
    id?: SortOrder
    site?: SortOrder
    mediaUrl?: SortOrder
    thumbnailUrl?: SortOrder
    title?: SortOrder
    mediaType?: SortOrder
    aspectRatio?: SortOrder
    order?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GalleryItemAvgOrderByAggregateInput = {
    id?: SortOrder
    order?: SortOrder
  }

  export type GalleryItemMaxOrderByAggregateInput = {
    id?: SortOrder
    site?: SortOrder
    mediaUrl?: SortOrder
    thumbnailUrl?: SortOrder
    title?: SortOrder
    mediaType?: SortOrder
    aspectRatio?: SortOrder
    order?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GalleryItemMinOrderByAggregateInput = {
    id?: SortOrder
    site?: SortOrder
    mediaUrl?: SortOrder
    thumbnailUrl?: SortOrder
    title?: SortOrder
    mediaType?: SortOrder
    aspectRatio?: SortOrder
    order?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GalleryItemSumOrderByAggregateInput = {
    id?: SortOrder
    order?: SortOrder
  }

  export type BlogPostCountOrderByAggregateInput = {
    id?: SortOrder
    imageUrl?: SortOrder
    imageRatio?: SortOrder
    title?: SortOrder
    author?: SortOrder
    article?: SortOrder
    publishedAt?: SortOrder
    isPublished?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BlogPostAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type BlogPostMaxOrderByAggregateInput = {
    id?: SortOrder
    imageUrl?: SortOrder
    imageRatio?: SortOrder
    title?: SortOrder
    author?: SortOrder
    article?: SortOrder
    publishedAt?: SortOrder
    isPublished?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BlogPostMinOrderByAggregateInput = {
    id?: SortOrder
    imageUrl?: SortOrder
    imageRatio?: SortOrder
    title?: SortOrder
    author?: SortOrder
    article?: SortOrder
    publishedAt?: SortOrder
    isPublished?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BlogPostSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type ForeignListingCountOrderByAggregateInput = {
    id?: SortOrder
    brand?: SortOrder
    model?: SortOrder
    year?: SortOrder
    price?: SortOrder
    pdfUrl?: SortOrder
    category?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ForeignListingAvgOrderByAggregateInput = {
    id?: SortOrder
    year?: SortOrder
    price?: SortOrder
  }

  export type ForeignListingMaxOrderByAggregateInput = {
    id?: SortOrder
    brand?: SortOrder
    model?: SortOrder
    year?: SortOrder
    price?: SortOrder
    pdfUrl?: SortOrder
    category?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ForeignListingMinOrderByAggregateInput = {
    id?: SortOrder
    brand?: SortOrder
    model?: SortOrder
    year?: SortOrder
    price?: SortOrder
    pdfUrl?: SortOrder
    category?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ForeignListingSumOrderByAggregateInput = {
    id?: SortOrder
    year?: SortOrder
    price?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type FaqItemListRelationFilter = {
    every?: FaqItemWhereInput
    some?: FaqItemWhereInput
    none?: FaqItemWhereInput
  }

  export type FaqItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FaqCategoryCountOrderByAggregateInput = {
    id?: SortOrder
    site?: SortOrder
    title?: SortOrder
    order?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FaqCategoryAvgOrderByAggregateInput = {
    id?: SortOrder
    order?: SortOrder
  }

  export type FaqCategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    site?: SortOrder
    title?: SortOrder
    order?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FaqCategoryMinOrderByAggregateInput = {
    id?: SortOrder
    site?: SortOrder
    title?: SortOrder
    order?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FaqCategorySumOrderByAggregateInput = {
    id?: SortOrder
    order?: SortOrder
  }

  export type FaqCategoryRelationFilter = {
    is?: FaqCategoryWhereInput
    isNot?: FaqCategoryWhereInput
  }

  export type FaqItemCountOrderByAggregateInput = {
    id?: SortOrder
    categoryId?: SortOrder
    question?: SortOrder
    answer?: SortOrder
    order?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FaqItemAvgOrderByAggregateInput = {
    id?: SortOrder
    categoryId?: SortOrder
    order?: SortOrder
  }

  export type FaqItemMaxOrderByAggregateInput = {
    id?: SortOrder
    categoryId?: SortOrder
    question?: SortOrder
    answer?: SortOrder
    order?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FaqItemMinOrderByAggregateInput = {
    id?: SortOrder
    categoryId?: SortOrder
    question?: SortOrder
    answer?: SortOrder
    order?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FaqItemSumOrderByAggregateInput = {
    id?: SortOrder
    categoryId?: SortOrder
    order?: SortOrder
  }

  export type NewsletterSubscriberCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
  }

  export type NewsletterSubscriberMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
  }

  export type NewsletterSubscriberMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumSiteTypeFieldUpdateOperationsInput = {
    set?: $Enums.SiteType
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FaqItemCreateNestedManyWithoutCategoryInput = {
    create?: XOR<FaqItemCreateWithoutCategoryInput, FaqItemUncheckedCreateWithoutCategoryInput> | FaqItemCreateWithoutCategoryInput[] | FaqItemUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: FaqItemCreateOrConnectWithoutCategoryInput | FaqItemCreateOrConnectWithoutCategoryInput[]
    createMany?: FaqItemCreateManyCategoryInputEnvelope
    connect?: FaqItemWhereUniqueInput | FaqItemWhereUniqueInput[]
  }

  export type FaqItemUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<FaqItemCreateWithoutCategoryInput, FaqItemUncheckedCreateWithoutCategoryInput> | FaqItemCreateWithoutCategoryInput[] | FaqItemUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: FaqItemCreateOrConnectWithoutCategoryInput | FaqItemCreateOrConnectWithoutCategoryInput[]
    createMany?: FaqItemCreateManyCategoryInputEnvelope
    connect?: FaqItemWhereUniqueInput | FaqItemWhereUniqueInput[]
  }

  export type FaqItemUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<FaqItemCreateWithoutCategoryInput, FaqItemUncheckedCreateWithoutCategoryInput> | FaqItemCreateWithoutCategoryInput[] | FaqItemUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: FaqItemCreateOrConnectWithoutCategoryInput | FaqItemCreateOrConnectWithoutCategoryInput[]
    upsert?: FaqItemUpsertWithWhereUniqueWithoutCategoryInput | FaqItemUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: FaqItemCreateManyCategoryInputEnvelope
    set?: FaqItemWhereUniqueInput | FaqItemWhereUniqueInput[]
    disconnect?: FaqItemWhereUniqueInput | FaqItemWhereUniqueInput[]
    delete?: FaqItemWhereUniqueInput | FaqItemWhereUniqueInput[]
    connect?: FaqItemWhereUniqueInput | FaqItemWhereUniqueInput[]
    update?: FaqItemUpdateWithWhereUniqueWithoutCategoryInput | FaqItemUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: FaqItemUpdateManyWithWhereWithoutCategoryInput | FaqItemUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: FaqItemScalarWhereInput | FaqItemScalarWhereInput[]
  }

  export type FaqItemUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<FaqItemCreateWithoutCategoryInput, FaqItemUncheckedCreateWithoutCategoryInput> | FaqItemCreateWithoutCategoryInput[] | FaqItemUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: FaqItemCreateOrConnectWithoutCategoryInput | FaqItemCreateOrConnectWithoutCategoryInput[]
    upsert?: FaqItemUpsertWithWhereUniqueWithoutCategoryInput | FaqItemUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: FaqItemCreateManyCategoryInputEnvelope
    set?: FaqItemWhereUniqueInput | FaqItemWhereUniqueInput[]
    disconnect?: FaqItemWhereUniqueInput | FaqItemWhereUniqueInput[]
    delete?: FaqItemWhereUniqueInput | FaqItemWhereUniqueInput[]
    connect?: FaqItemWhereUniqueInput | FaqItemWhereUniqueInput[]
    update?: FaqItemUpdateWithWhereUniqueWithoutCategoryInput | FaqItemUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: FaqItemUpdateManyWithWhereWithoutCategoryInput | FaqItemUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: FaqItemScalarWhereInput | FaqItemScalarWhereInput[]
  }

  export type FaqCategoryCreateNestedOneWithoutItemsInput = {
    create?: XOR<FaqCategoryCreateWithoutItemsInput, FaqCategoryUncheckedCreateWithoutItemsInput>
    connectOrCreate?: FaqCategoryCreateOrConnectWithoutItemsInput
    connect?: FaqCategoryWhereUniqueInput
  }

  export type FaqCategoryUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<FaqCategoryCreateWithoutItemsInput, FaqCategoryUncheckedCreateWithoutItemsInput>
    connectOrCreate?: FaqCategoryCreateOrConnectWithoutItemsInput
    upsert?: FaqCategoryUpsertWithoutItemsInput
    connect?: FaqCategoryWhereUniqueInput
    update?: XOR<XOR<FaqCategoryUpdateToOneWithWhereWithoutItemsInput, FaqCategoryUpdateWithoutItemsInput>, FaqCategoryUncheckedUpdateWithoutItemsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumSiteTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.SiteType | EnumSiteTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SiteType[] | ListEnumSiteTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SiteType[] | ListEnumSiteTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSiteTypeFilter<$PrismaModel> | $Enums.SiteType
  }

  export type NestedEnumSiteTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SiteType | EnumSiteTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SiteType[] | ListEnumSiteTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SiteType[] | ListEnumSiteTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSiteTypeWithAggregatesFilter<$PrismaModel> | $Enums.SiteType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSiteTypeFilter<$PrismaModel>
    _max?: NestedEnumSiteTypeFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type FaqItemCreateWithoutCategoryInput = {
    question: string
    answer: string
    order?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FaqItemUncheckedCreateWithoutCategoryInput = {
    id?: number
    question: string
    answer: string
    order?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FaqItemCreateOrConnectWithoutCategoryInput = {
    where: FaqItemWhereUniqueInput
    create: XOR<FaqItemCreateWithoutCategoryInput, FaqItemUncheckedCreateWithoutCategoryInput>
  }

  export type FaqItemCreateManyCategoryInputEnvelope = {
    data: FaqItemCreateManyCategoryInput | FaqItemCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type FaqItemUpsertWithWhereUniqueWithoutCategoryInput = {
    where: FaqItemWhereUniqueInput
    update: XOR<FaqItemUpdateWithoutCategoryInput, FaqItemUncheckedUpdateWithoutCategoryInput>
    create: XOR<FaqItemCreateWithoutCategoryInput, FaqItemUncheckedCreateWithoutCategoryInput>
  }

  export type FaqItemUpdateWithWhereUniqueWithoutCategoryInput = {
    where: FaqItemWhereUniqueInput
    data: XOR<FaqItemUpdateWithoutCategoryInput, FaqItemUncheckedUpdateWithoutCategoryInput>
  }

  export type FaqItemUpdateManyWithWhereWithoutCategoryInput = {
    where: FaqItemScalarWhereInput
    data: XOR<FaqItemUpdateManyMutationInput, FaqItemUncheckedUpdateManyWithoutCategoryInput>
  }

  export type FaqItemScalarWhereInput = {
    AND?: FaqItemScalarWhereInput | FaqItemScalarWhereInput[]
    OR?: FaqItemScalarWhereInput[]
    NOT?: FaqItemScalarWhereInput | FaqItemScalarWhereInput[]
    id?: IntFilter<"FaqItem"> | number
    categoryId?: IntFilter<"FaqItem"> | number
    question?: StringFilter<"FaqItem"> | string
    answer?: StringFilter<"FaqItem"> | string
    order?: IntFilter<"FaqItem"> | number
    isActive?: BoolFilter<"FaqItem"> | boolean
    createdAt?: DateTimeFilter<"FaqItem"> | Date | string
    updatedAt?: DateTimeFilter<"FaqItem"> | Date | string
  }

  export type FaqCategoryCreateWithoutItemsInput = {
    site: $Enums.SiteType
    title: string
    order?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FaqCategoryUncheckedCreateWithoutItemsInput = {
    id?: number
    site: $Enums.SiteType
    title: string
    order?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FaqCategoryCreateOrConnectWithoutItemsInput = {
    where: FaqCategoryWhereUniqueInput
    create: XOR<FaqCategoryCreateWithoutItemsInput, FaqCategoryUncheckedCreateWithoutItemsInput>
  }

  export type FaqCategoryUpsertWithoutItemsInput = {
    update: XOR<FaqCategoryUpdateWithoutItemsInput, FaqCategoryUncheckedUpdateWithoutItemsInput>
    create: XOR<FaqCategoryCreateWithoutItemsInput, FaqCategoryUncheckedCreateWithoutItemsInput>
    where?: FaqCategoryWhereInput
  }

  export type FaqCategoryUpdateToOneWithWhereWithoutItemsInput = {
    where?: FaqCategoryWhereInput
    data: XOR<FaqCategoryUpdateWithoutItemsInput, FaqCategoryUncheckedUpdateWithoutItemsInput>
  }

  export type FaqCategoryUpdateWithoutItemsInput = {
    site?: EnumSiteTypeFieldUpdateOperationsInput | $Enums.SiteType
    title?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FaqCategoryUncheckedUpdateWithoutItemsInput = {
    id?: IntFieldUpdateOperationsInput | number
    site?: EnumSiteTypeFieldUpdateOperationsInput | $Enums.SiteType
    title?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FaqItemCreateManyCategoryInput = {
    id?: number
    question: string
    answer: string
    order?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FaqItemUpdateWithoutCategoryInput = {
    question?: StringFieldUpdateOperationsInput | string
    answer?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FaqItemUncheckedUpdateWithoutCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    question?: StringFieldUpdateOperationsInput | string
    answer?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FaqItemUncheckedUpdateManyWithoutCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    question?: StringFieldUpdateOperationsInput | string
    answer?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use FaqCategoryCountOutputTypeDefaultArgs instead
     */
    export type FaqCategoryCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = FaqCategoryCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CmsAdminDefaultArgs instead
     */
    export type CmsAdminArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CmsAdminDefaultArgs<ExtArgs>
    /**
     * @deprecated Use HeroImageDefaultArgs instead
     */
    export type HeroImageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = HeroImageDefaultArgs<ExtArgs>
    /**
     * @deprecated Use VideoBannerDefaultArgs instead
     */
    export type VideoBannerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = VideoBannerDefaultArgs<ExtArgs>
    /**
     * @deprecated Use GalleryItemDefaultArgs instead
     */
    export type GalleryItemArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = GalleryItemDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BlogPostDefaultArgs instead
     */
    export type BlogPostArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BlogPostDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ForeignListingDefaultArgs instead
     */
    export type ForeignListingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ForeignListingDefaultArgs<ExtArgs>
    /**
     * @deprecated Use FaqCategoryDefaultArgs instead
     */
    export type FaqCategoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = FaqCategoryDefaultArgs<ExtArgs>
    /**
     * @deprecated Use FaqItemDefaultArgs instead
     */
    export type FaqItemArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = FaqItemDefaultArgs<ExtArgs>
    /**
     * @deprecated Use NewsletterSubscriberDefaultArgs instead
     */
    export type NewsletterSubscriberArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = NewsletterSubscriberDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}