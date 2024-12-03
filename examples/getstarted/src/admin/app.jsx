import React, { useEffect } from 'react';

import { Button } from '@strapi/design-system';

import { registerPreviewRoute } from './preview';

const config = {
  locales: ['it', 'es', 'en', 'en-GB'], // Available locales
};

// Add custom title in the bootstrap method
const bootstrap = (app) => {
  // Set a custom title when the admin panel loads
  document.title = 'AI4MAHILA ADMIN PORTAL'; // Change to your desired title

  // Add a "Preview" button to the content manager
  app.getPlugin('content-manager').injectComponent('editView', 'right-links', {
    name: 'PreviewButton',
    Component: () => (
      <Button onClick={() => window.alert('Not here, The preview is.')}>Preview</Button>
    ),
  });
};

export default {
  config,
  register: (app) => {
    registerPreviewRoute(app);
  },
  bootstrap,
};
