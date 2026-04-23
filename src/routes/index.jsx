import { createBrowserRouter } from 'react-router-dom';

// project-imports
//import ChartMapRoutes from './ChartMapRoutes';
//import ComponentsRoutes from './ComponentsRoutes';
//import FormsRoutes from './FormsRoutes';
//import OtherRoutes from './OtherRoutes';
import PagesRoutes from './PagesRoutes';
import NavigationRoutes from './NavigationRoutes';
//import TablesRoutes from './TablesRoutes';
import PipelineRoutes from './PipelineRoutes';


// {
//   path: '/pipeline',
//   element: <PipelinePage />
// }

// ==============================|| ROUTING RENDER ||============================== //

const router = createBrowserRouter(
  // [NavigationRoutes,PipelineRoutes, ComponentsRoutes, FormsRoutes, TablesRoutes, PagesRoutes, OtherRoutes, ChartMapRoutes],
  [NavigationRoutes,PipelineRoutes,  PagesRoutes, ],
  {
    basename: import.meta.env.VITE_APP_BASE_NAME
  }
);

export default router;
