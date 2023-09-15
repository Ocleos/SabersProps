import { createIcon } from '@gluestack-ui/themed';
import * as React from 'react';
import { Path } from 'react-native-svg';

const DeathTrooperIcon = createIcon({
  viewBox: '0 0 100 100',
  path: (
    <>
      <Path
        d='m73.582918 53.83466 2.32546 8.667624q.317109 1.057027-.634216 2.008352l-12.79003 11.6273-.528514.42281-.211405.528514q4.016704 1.479838 4.65092 4.862326.528514 2.853973-1.16273 5.919352l-1.479838-1.374135q-.422811-.317108-.211406-.951325.528514-1.057027.211406-2.536865-.528514-1.796947-2.431163-2.431163l-1.796946-.105703-1.585541.317109q-.739919.317108-1.16273-.211406l-1.585541-1.268433q-.422811-.422811 0-.951324l5.285136-5.602245q.528514-.634216.317108-1.479838l-3.911-13.95276q-.422811-1.374135 1.16273-1.796946l2.431162 5.179433 3.805298 7.504894q.317109.845622.951325.211405l6.447866-5.919352q.739919-.528514.422811-1.479838l-1.902649-8.456219q-.105703-.634216.422811-1.057027l1.479838-1.16273 1.585541-1.16273.422811-.739919.634216-4.122406q.211406-.634217.951325-.634217t.739919.845622v4.016704l-.422811 1.057027-2.32546 3.171082q-.211405.528513-.105703 1.057027zM36.269856 83.008613q-.422811 1.479838.105702 2.536865.211406.634217-.105702.951325l-1.691244 1.374135q-1.585541-3.065379-1.057027-5.919352.634216-3.382488 4.65092-4.862326l-.211406-.528514-.528513-.42281-12.79003-11.6273q-.951325-.951325-.528514-2.008352l2.219757-8.667624q.211406-.528514-.105702-1.057027l-2.32546-3.171082-.317109-1.057027V44.53282q0-.845622.73992-.845622.634216 0 .845621.634217l.634217 4.122406.422811.739919 1.585541 1.16273 1.479838 1.16273q.528513.422811.317108 1.057027l-1.796946 8.456219q-.317109.951324.42281 1.479838l6.342164 5.919352q.739919.634217 1.057027-.211405l3.699596-7.504894 2.642568-5.179433q1.479838.422811 1.16273 1.796946l-4.016704 13.95276q-.211405.845622.317109 1.479838l5.179433 5.602245q.528514.528513 0 .951324l-1.479838 1.268433q-.422811.528514-1.16273.211406l-1.585541-.317109-1.796946.105703q-2.008352.634216-2.32546 2.431163zm14.058462-3.911001h-.739919l-.845621-.211406-1.691244-1.796946-.317108-.845622v-4.122406q0-.634216.739919-.634216H52.442373q.739919 0 .739919.634216v4.122406l-.317108.845622-1.691244 1.796946Zm-1.057027-29.596764h1.374136q.634216 0 1.374135.634217 1.479838 1.16273 1.374136 3.48819v12.472921q-.105703 1.057028-1.057028 1.057028h-4.756622q-1.057028 0-1.057028-1.057028V53.623255q0-2.32546 1.268433-3.48819.845622-.634217 1.479838-.634217zm.739919 38.898604-.528513-.105703H46.52302q-.951324 0-1.374135.634217-1.057027 1.268432-2.642568 1.479838-1.902649.211405-3.171082-1.057028-1.16273-1.057027-1.16273-2.32546 0-1.58554 1.374135-2.74827 1.057028-.951325 2.642568-.845622 1.585541.105702 2.536866 1.16273.951324 1.16273 2.853974 1.057027h4.65092q2.008351.105703 2.959676-1.057027.951324-1.057028 2.536865-1.16273 1.585541-.105703 2.642569.845622 1.374135 1.16273 1.374135 2.74827 0 1.268433-1.057027 2.32546-1.374136 1.268433-3.276785 1.057028-1.585541-.211406-2.536865-1.479838-.634217-.634217-1.585541-.634217h-2.853974ZM26.862313 34.385358H73.054405q1.479838 0 1.479838 1.268433v.528514q0 1.902649-1.691244 3.171081l-7.927704 5.919353-.211406.211406q-1.374135 1.057027-.211405 2.431162l1.479838 1.902649-.105703.105703-12.79003-6.659272 3.276785-4.862325-1.057027-.422811h-4.65092l-.634217.105703-.739919-.105703h-4.65092l-1.057027.422811 3.382487 4.862325-12.895733 6.659272-.105702-.105703 1.479838-1.902649q1.16273-1.374135-.317108-2.431162l-.211406-.211406-7.822002-5.919353q-1.691243-1.268432-1.691243-3.171081v-.528514q0-1.268433 1.479838-1.268433zm10.675975 60.567663h24.840141q.951325.211405 1.374136-.528514 1.796946-2.853973 5.390839-3.699595l2.748271-1.057027q1.585541-.845622 2.748271-2.853974.528513-.739919-.211406-1.374135l-1.16273-1.16273q-.528513-.422811-.105702-.951325l4.756622-5.496542q1.585541-1.691243.422811-3.48819-.211405-.317108.211406-.845622l6.025055-7.187785q2.219757-2.748271 2.536866-5.919353.317108-3.911001-2.853974-7.399191l-2.536866-2.748271q-1.479838-1.585541-1.691243-3.699595l-.211406-5.919353v-5.919353q0-6.659271-2.114054-12.367219-2.219757-6.130758-7.187786-10.147461-3.805298-3.1710823-8.879029-5.0737314-3.805298-1.2684327-8.350515-1.9026491l-2.959677-.2114054-.317108.1057027-.528513-.1057027-2.959677.2114054q-4.439514.6342164-8.350515 1.9026491-4.968028 1.9026491-8.773327 5.0737314-4.862325 4.016703-7.187785 10.147461-2.114055 5.707948-2.114055 12.367219v5.919353l-.211405 5.919353q-.211405 2.114054-1.691244 3.699595l-2.642568 2.748271q-3.065379 3.48819-2.642568 7.399191.317109 3.171082 2.536865 5.919353l5.919353 7.187785q.422811.528514.105703.845622-1.16273 1.796947.422811 3.48819l4.756623 5.496542q.528513.528514 0 .951325l-1.16273 1.16273q-.73992.634216-.211406 1.374135 1.16273 2.008352 2.642568 2.853974l2.853974 1.057027q3.593893.845622 5.390839 3.699595.422811.739919 1.374135.528514z'
        fill='currentColor'
      />
    </>
  ),
});

export default DeathTrooperIcon;
