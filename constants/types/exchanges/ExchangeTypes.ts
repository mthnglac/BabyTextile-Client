import { StackScreenProps } from '@react-navigation/stack/lib/typescript/src/types';

export type StackParamList = {
    Exchanges: undefined;
    ExchangeDetails: undefined;
}

export type TopTabParamList = {
    Awaiting: undefined;
    Shipped: undefined;
    Completed: undefined;
    Refunded: undefined;
}
export type ExchangeDetailsProps = StackScreenProps<StackParamList, 'ExchangeDetails'>
