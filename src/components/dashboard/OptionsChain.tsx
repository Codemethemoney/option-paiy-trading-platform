import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const OptionsChain = ({ symbol }: { symbol: string }) => {
  const { data: options, isLoading } = useQuery({
    queryKey: ['options', symbol],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Option')
        .select('*')
        .eq('underlyingSymbol', symbol);
      
      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return <div>Loading options chain...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Options Chain - {symbol}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Strike</TableHead>
              <TableHead>Expiry</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Premium</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {options?.map((option) => (
              <TableRow key={option.id}>
                <TableCell>{option.strike}</TableCell>
                <TableCell>{new Date(option.expiration).toLocaleDateString()}</TableCell>
                <TableCell>{option.type}</TableCell>
                <TableCell>${option.premium}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default OptionsChain;