import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AnswerOption = {
  __typename?: 'AnswerOption';
  correct: Scalars['Boolean'];
  text: Scalars['String'];
};

export type Carrera = {
  __typename?: 'Carrera';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type HomePageMessage = {
  __typename?: 'HomePageMessage';
  active: Scalars['Boolean'];
  message: Scalars['String'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
};

export type PlacementSettings = {
  __typename?: 'PlacementSettings';
  homePageMessage: HomePageMessage;
  isClosed: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  carreras: Array<Carrera>;
  isClosed: Scalars['Boolean'];
  placementHomePageMessage: HomePageMessage;
  section: Section;
  settings?: Maybe<PlacementSettings>;
};


export type QuerySectionArgs = {
  course: Scalars['String'];
  level: Scalars['Int'];
};

export type Question = {
  __typename?: 'Question';
  options: Array<AnswerOption>;
  title: Scalars['String'];
};

export type Section = {
  __typename?: 'Section';
  course: Scalars['String'];
  id: Scalars['ID'];
  pageInfo?: Maybe<PageInfo>;
  questions: Array<Question>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AnswerOption: ResolverTypeWrapper<AnswerOption>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Carrera: ResolverTypeWrapper<Carrera>;
  HomePageMessage: ResolverTypeWrapper<HomePageMessage>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  PlacementSettings: ResolverTypeWrapper<PlacementSettings>;
  Query: ResolverTypeWrapper<{}>;
  Question: ResolverTypeWrapper<Question>;
  Section: ResolverTypeWrapper<Section>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AnswerOption: AnswerOption;
  Boolean: Scalars['Boolean']['output'];
  Carrera: Carrera;
  HomePageMessage: HomePageMessage;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  PageInfo: PageInfo;
  PlacementSettings: PlacementSettings;
  Query: {};
  Question: Question;
  Section: Section;
  String: Scalars['String']['output'];
};

export type AnswerOptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['AnswerOption'] = ResolversParentTypes['AnswerOption']> = {
  correct?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CarreraResolvers<ContextType = any, ParentType extends ResolversParentTypes['Carrera'] = ResolversParentTypes['Carrera']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HomePageMessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['HomePageMessage'] = ResolversParentTypes['HomePageMessage']> = {
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlacementSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['PlacementSettings'] = ResolversParentTypes['PlacementSettings']> = {
  homePageMessage?: Resolver<ResolversTypes['HomePageMessage'], ParentType, ContextType>;
  isClosed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  carreras?: Resolver<Array<ResolversTypes['Carrera']>, ParentType, ContextType>;
  isClosed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  placementHomePageMessage?: Resolver<ResolversTypes['HomePageMessage'], ParentType, ContextType>;
  section?: Resolver<ResolversTypes['Section'], ParentType, ContextType, RequireFields<QuerySectionArgs, 'course' | 'level'>>;
  settings?: Resolver<Maybe<ResolversTypes['PlacementSettings']>, ParentType, ContextType>;
};

export type QuestionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Question'] = ResolversParentTypes['Question']> = {
  options?: Resolver<Array<ResolversTypes['AnswerOption']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Section'] = ResolversParentTypes['Section']> = {
  course?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  questions?: Resolver<Array<ResolversTypes['Question']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AnswerOption?: AnswerOptionResolvers<ContextType>;
  Carrera?: CarreraResolvers<ContextType>;
  HomePageMessage?: HomePageMessageResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  PlacementSettings?: PlacementSettingsResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Question?: QuestionResolvers<ContextType>;
  Section?: SectionResolvers<ContextType>;
};

