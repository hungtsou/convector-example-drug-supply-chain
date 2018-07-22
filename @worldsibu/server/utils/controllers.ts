/**
 * This file is in charge of building a controller (or set of controllers made up)
 * of the baseline logic you designed on your chaincode project, but replacing the logic
 * with your own for NodeJS. We inject here the `convector-adapter-fabric` which calls
 * the blockchain based on your own configuration.
 */

/** The client is the component in charge of bringing the "interface" of your business
 * logic right from the chaincode project.
 * Implementation will depend on this layer. In this case, what we want to do at this layer
 * is to call the backend peers.
 */
import { DrugControllerClient } from '@worldsibu/convector-example-dsc-cc-drug/dist/client';
import { FabricControllerAdapter } from '@worldsibu/convector-adapter-fabric';
import { join } from 'path';
import { Helper } from './helper';

/**
 * Building this adapter allows you to communicate with the
 * test env created by `convector-tool-dev-env`.
 */
//
// test
const adapter = new FabricControllerAdapter(({
  txTimeout: 10000,
  user: 'user1',
  channel: 'ch1',
  chaincode: 'dsc',
  version: '1.2',
  // Go to your project's root
  // for the shared crypto objects
  keyStore: join(__dirname, '../../.convector-dev-env/.hfc-org1'),
  // This has a soft link to the root of the project
  // For production, this file will point to another folder
  networkProfile: join(__dirname, '../config/org1.network-profile.yaml')
} as any));

adapter.init();

// Inject the adapter here.
export const DrugController = new DrugControllerClient(adapter);