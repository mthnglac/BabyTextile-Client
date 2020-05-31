import { StackScreenProps } from '@react-navigation/stack/lib/typescript/src/types';

export type StackParamList = {
    Orders: undefined;
    OrderDetails: undefined;
}

export type TopTabParamList = {
    Awaiting: undefined;
    Shipped: undefined;
    Completed: undefined;
    Refunded: undefined;
}
export type OrderDetailsProps = StackScreenProps<StackParamList, 'OrderDetails'>
