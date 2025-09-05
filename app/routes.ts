import { type RouteConfig, route, layout } from "@react-router/dev/routes";

export default [
  layout("routes/admin/admin-layout.tsx", [
    route("dashboard", "routes/admin/dashboard.tsx"),
    route("all-users", "routes/admin/all-users.tsx"),
  ]),
] satisfies RouteConfig;

//in layout we pass an array of routes , which are differnt routes in the layout as children

//when putting something in layout , it doesn't mean that you have to prepen the path with layout route
//as here you will be able to see the Admin layout text on dashboard path ,
//Layout allow to style the route a bit further
