export function formatPrice(valueInCents) {
    const formattedValue = valueInCents / 100;
    return formattedValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}