
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type StaticProps<T extends ((...args: any) => Promise<{ props: any }>)> = Awaited<ReturnType<T>>['props'];
