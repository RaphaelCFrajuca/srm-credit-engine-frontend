import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorState } from "../../../components/ui/ErrorState";
import { Loading } from "../../../components/ui/Loading";
import type { SettlementExtractQuery } from "../../../types/api";
import { useAssignors } from "../../assignors/services/assignor.service";
import { useCurrencies } from "../../currencies/services/currency.service";
import { SettlementExtractFilters } from "../components/SettlementExtractFilters";
import { SettlementExtractPagination } from "../components/SettlementExtractPagination";
import { SettlementExtractTable } from "../components/SettlementExtractTable";
import {
  settlementExtractSchema,
  type SettlementExtractSchema,
} from "../schemas/settlement-extract.schema";
import { useSettlementExtract } from "../services/settlement-extract.service";

export const SettlementExtractPage = () => {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<SettlementExtractSchema>({
    pageSize: 10,
  });

  const form = useForm<SettlementExtractSchema>({
    resolver: zodResolver(settlementExtractSchema),
    defaultValues: { pageSize: 10 },
  });

  const query = useMemo<SettlementExtractQuery>(
    () => ({
      from: filters.from || undefined,
      to: filters.to || undefined,
      assignorId: filters.assignorId || undefined,
      currencyId: filters.currencyId || undefined,
      faceCurrencyId: filters.faceCurrencyId || undefined,
      paymentCurrencyId: filters.paymentCurrencyId || undefined,
      receivableType: filters.receivableType || undefined,
      status: filters.status || undefined,
      page,
      pageSize: filters.pageSize ?? 10,
    }),
    [filters, page],
  );

  const extract = useSettlementExtract(query);
  const assignors = useAssignors();
  const currencies = useCurrencies();

  if (assignors.isPending || currencies.isPending)
    return <Loading text="Carregando filtros..." />;
  if (assignors.isError)
    return (
      <ErrorState
        text={(assignors.error as Error).message}
        onRetry={() => void assignors.refetch()}
      />
    );
  if (currencies.isError)
    return (
      <ErrorState
        text={(currencies.error as Error).message}
        onRetry={() => void currencies.refetch()}
      />
    );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Extrato de Liquidação</h2>

      <SettlementExtractFilters
        form={form}
        assignors={assignors.data}
        currencies={currencies.data}
        onSearch={() => {
          const values = form.getValues();
          setPage(1);
          setFilters(values);
        }}
        onClear={() => {
          form.reset({ pageSize: 10 });
          setPage(1);
          setFilters({ pageSize: 10 });
        }}
      />

      {extract.isPending ? <Loading text="Carregando extrato..." /> : null}
      {extract.isError ? (
        <ErrorState
          text={(extract.error as Error).message}
          onRetry={() => void extract.refetch()}
        />
      ) : null}
      {extract.data ? (
        <>
          <SettlementExtractTable items={extract.data.data} />
          <SettlementExtractPagination
            page={extract.data.page}
            totalPages={extract.data.totalPages}
            totalItems={extract.data.totalItems}
            onPrevious={() => setPage((current) => Math.max(current - 1, 1))}
            onNext={() => setPage((current) => current + 1)}
          />
        </>
      ) : null}
    </div>
  );
};
