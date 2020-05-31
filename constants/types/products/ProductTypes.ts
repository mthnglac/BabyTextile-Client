import { StackScreenProps } from '@react-navigation/stack/lib/typescript/src/types';

export type StackParamList = {
    Products: undefined;
    ProductDetails: { colors: Array<string>; product: any };
}

export type TopTabParamList = {
    Bornoz: undefined;
    Pijama: undefined;
    Şapka: undefined;
}

export type ProductsProps = StackScreenProps<StackParamList, 'Products'>
export type ProductDetailsProps = StackScreenProps<StackParamList, 'ProductDetails'>
