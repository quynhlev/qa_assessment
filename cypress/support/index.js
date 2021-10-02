import './commands'
import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';

Cypress.Screenshot.defaults({
    capture: 'viewport',
    scale: true,
    clip: { x: 0, y: 0, width: 506, height: 100 }
})
addMatchImageSnapshotCommand();