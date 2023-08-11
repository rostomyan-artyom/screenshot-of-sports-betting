declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module "uuid"
declare module "balm-ui-plus"
declare module "@/store/quotes"
declare module "@/store/express"
declare module "@/store/auth"
declare module "@/store/api"
declare module "@/helpers/api"
declare module "@/api/quotes"
declare module "@/api/auth"



