import React, { useMemo, useState } from "react";

export default function CNPJConsultor() {
  const [cnpj, setCnpj] = useState("");
  const [data, setData] = useState(null);
  const [rawJsonVisible, setRawJsonVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cleanCNPJ = (value) => value.replace(/\D/g, "");

  const formatCNPJ = (value) => {
    const numbers = value.replace(/\D/g, "").slice(0, 14);

    return numbers
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  };

  const formatCEP = (cep) => {
    if (!cep) return "-";
    return cep.replace(/^(\d{5})(\d{3})$/, "$1-$2");
  };

  const formatDate = (date) => {
    if (!date) return "-";

    try {
      return new Date(date).toLocaleDateString("pt-BR");
    } catch {
      return date;
    }
  };

  const formatMoney = (value) => {
    if (value === undefined || value === null) return "-";

    return Number(value).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const formatBoolean = (value) => {
    if (value === true) return "Sim";
    if (value === false) return "Não";
    return value;
  };

  const countFilledFields = (obj) => {
    let count = 0;

    const recursive = (value) => {
      if (Array.isArray(value)) {
        value.forEach(recursive);
      } else if (value && typeof value === "object") {
        Object.values(value).forEach(recursive);
      } else if (
        value !== null &&
        value !== undefined &&
        value !== ""
      ) {
        count++;
      }
    };

    recursive(obj);

    return count;
  };

  const totalFilledFields = useMemo(() => {
    if (!data) return 0;
    return countFilledFields(data);
  }, [data]);

  const handleConsult = async () => {
    setError("");
    setData(null);

    const clean = cleanCNPJ(cnpj);

    if (clean.length !== 14) {
      setError("Digite um CNPJ válido.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `https://publica.cnpj.ws/cnpj/${clean}`
      );

      if (!response.ok) {
        throw new Error("CNPJ não encontrado.");
      }

      const json = await response.json();

      setData(json);
    } catch (err) {
      setError(err.message || "Erro ao consultar API.");
    } finally {
      setLoading(false);
    }
  };

  const copyJSON = async () => {
    try {
      await navigator.clipboard.writeText(
        JSON.stringify(data, null, 2)
      );

      alert("JSON copiado!");
    } catch {
      alert("Erro ao copiar JSON.");
    }
  };

  const renderValue = (key, value) => {
    if (value === null || value === undefined || value === "") {
      return (
        <span className="text-zinc-400 italic">
          Não informado
        </span>
      );
    }

    if (typeof value === "boolean") {
      return (
        <span className="font-medium">
          {formatBoolean(value)}
        </span>
      );
    }

    if (
      key.toLowerCase().includes("data") ||
      key.toLowerCase().includes("date")
    ) {
      return formatDate(value);
    }

    if (key.toLowerCase().includes("cep")) {
      return formatCEP(value);
    }

    if (
      key.toLowerCase().includes("capital") &&
      typeof value === "number"
    ) {
      return formatMoney(value);
    }

    if (
      key.toLowerCase().includes("cnpj") &&
      typeof value === "string"
    ) {
      return formatCNPJ(value);
    }

    return String(value);
  };

  const RecursiveRenderer = ({ data, level = 0 }) => {
    if (Array.isArray(data)) {
      return (
        <div className="space-y-3">
          {data.map((item, index) => (
            <div
              key={index}
              className="border border-zinc-200 rounded-xl p-4 bg-zinc-50"
            >
              <div className="text-xs font-bold text-zinc-500 mb-2">
                ITEM #{index + 1}
              </div>

              <RecursiveRenderer
                data={item}
                level={level + 1}
              />
            </div>
          ))}
        </div>
      );
    }

    if (typeof data === "object" && data !== null) {
      return (
        <div className="space-y-4">
          {Object.entries(data).map(([key, value]) => (
            <div
              key={key}
              className="border border-zinc-200 rounded-xl overflow-hidden"
            >
              <div className="bg-zinc-100 px-4 py-2 font-semibold text-zinc-700 uppercase text-xs tracking-wide">
                {key.replaceAll("_", " ")}
              </div>

              <div className="p-4">
                {typeof value === "object" && value !== null ? (
                  <RecursiveRenderer
                    data={value}
                    level={level + 1}
                  />
                ) : (
                  <div className="text-zinc-800 break-all">
                    {renderValue(key, value)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="text-zinc-700">
        {renderValue("", data)}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-zinc-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* HEADER */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-zinc-200">
          <div className="flex flex-col md:flex-row gap-4 md:items-end">
            <div className="flex-1">
              <h1 className="text-3xl font-black text-zinc-800">
                Consulta de CNPJ
              </h1>

              <p className="text-zinc-500 mt-2">
                Consulta inteligente com renderização dinâmica
                completa do JSON.
              </p>

              <div className="mt-6">
                <label className="block text-sm font-semibold text-zinc-700 mb-2">
                  CNPJ
                </label>

                <input
                  type="text"
                  value={cnpj}
                  onChange={(e) =>
                    setCnpj(formatCNPJ(e.target.value))
                  }
                  placeholder="00.000.000/0000-00"
                  className="w-full rounded-2xl border border-zinc-300 px-4 py-4 text-lg focus:outline-none focus:ring-4 focus:ring-zinc-300 transition"
                />
              </div>
            </div>

            <button
              onClick={handleConsult}
              disabled={loading}
              className="bg-zinc-900 hover:bg-zinc-800 text-white px-8 py-4 rounded-2xl font-bold transition-all disabled:opacity-50"
            >
              {loading ? "Consultando..." : "Consultar"}
            </button>
          </div>

          {error && (
            <div className="mt-4 bg-red-100 border border-red-300 text-red-700 rounded-2xl px-4 py-3">
              {error}
            </div>
          )}
        </div>

        {/* SUMMARY */}
        {data && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
              <InfoCard
                title="Razão Social"
                value={data.razao_social}
              />

              <InfoCard
                title="Nome Fantasia"
                value={data.estabelecimento?.nome_fantasia}
              />

              <InfoCard
                title="Situação"
                value={data.estabelecimento?.situacao_cadastral}
              />

              <InfoCard
                title="Capital Social"
                value={formatMoney(data.capital_social)}
              />

              <InfoCard
                title="CNAE"
                value={
                  data.estabelecimento?.atividade_principal
                    ?.descricao
                }
              />

              <InfoCard
                title="Telefone"
                value={
                  data.estabelecimento?.telefone1 ||
                  data.estabelecimento?.ddd1
                }
              />

              <InfoCard
                title="E-mail"
                value={data.estabelecimento?.email}
              />

              <InfoCard
                title="Cidade / UF"
                value={`${data.estabelecimento?.cidade?.nome || "-"
                  } / ${data.estabelecimento?.estado?.sigla || "-"
                  }`}
              />
            </div>

            {/* ADDRESS */}
            <div className="bg-white rounded-3xl shadow-lg p-6 border border-zinc-200">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-black text-zinc-800">
                    Endereço
                  </h2>

                  <p className="text-zinc-500 mt-1">
                    Dados do estabelecimento
                  </p>
                </div>

                <div className="bg-zinc-900 text-white px-5 py-3 rounded-2xl font-bold">
                  {totalFilledFields} campos preenchidos
                </div>
              </div>

              <div className="mt-6 text-lg text-zinc-700 leading-relaxed">
                {data.estabelecimento?.tipo_logradouro}{" "}
                {data.estabelecimento?.logradouro},{" "}
                {data.estabelecimento?.numero}
                {data.estabelecimento?.bairro &&
                  ` - ${data.estabelecimento?.bairro}`}
                <br />

                {data.estabelecimento?.cidade?.nome} /{" "}
                {data.estabelecimento?.estado?.sigla}
                <br />

                CEP:{" "}
                {formatCEP(data.estabelecimento?.cep)}
              </div>
            </div>

            {/* IE */}
            {data.estabelecimento?.inscricoes_estaduais
              ?.length > 0 && (
                <div className="bg-white rounded-3xl shadow-lg p-6 border border-zinc-200">
                  <h2 className="text-2xl font-black text-zinc-800 mb-6">
                    Inscrições Estaduais
                  </h2>

                  <div className="grid gap-4">
                    {data.estabelecimento.inscricoes_estaduais.map(
                      (ie, index) => (
                        <div
                          key={index}
                          className="border border-zinc-200 rounded-2xl p-4"
                        >
                          <div className="font-bold text-zinc-800">
                            {ie.inscricao_estadual}
                          </div>

                          <div className="text-sm text-zinc-500 mt-1">
                            {ie.estado?.sigla}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

            {/* ACTIONS */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() =>
                  setRawJsonVisible(!rawJsonVisible)
                }
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-2xl font-bold transition"
              >
                {rawJsonVisible
                  ? "Ocultar JSON"
                  : "Ver JSON Bruto"}
              </button>

              <button
                onClick={copyJSON}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-2xl font-bold transition"
              >
                Copiar JSON
              </button>
            </div>

            {/* RAW JSON */}
            {rawJsonVisible && (
              <div className="bg-zinc-950 text-zinc-100 rounded-3xl p-6 overflow-auto shadow-2xl">
                <pre className="text-sm whitespace-pre-wrap">
                  {JSON.stringify(data, null, 2)}
                </pre>
              </div>
            )}

            {/* DYNAMIC DATA */}
            <div className="bg-white rounded-3xl shadow-xl p-6 border border-zinc-200">
              <div className="mb-8">
                <h2 className="text-3xl font-black text-zinc-800">
                  Estrutura Completa do JSON
                </h2>

                <p className="text-zinc-500 mt-2">
                  Renderização automática de todos os dados
                  retornados pela API.
                </p>
              </div>

              <RecursiveRenderer data={data} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function InfoCard({ title, value }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg border border-zinc-200 p-5">
      <div className="text-sm uppercase tracking-wide text-zinc-500 font-bold">
        {title}
      </div>

      <div className="mt-3 text-lg font-bold text-zinc-800 break-words">
        {value || "-"}
      </div>
    </div>
  );
}