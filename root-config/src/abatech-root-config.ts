import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html";

const routes = constructRoutes(microfrontendLayout);
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    // return System.import(name);
    switch(name) {
      case 'microfrontend-1':
        return System.import('http://localhost:8081/main.js');
      case 'microfrontend-2':
        return System.import('http://localhost:8082/main.js');
      default:
        throw new Error(`Unknown application: ${name}`);
    }
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });

applications.forEach(registerApplication);
layoutEngine.activate();
start();

