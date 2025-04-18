import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createChart } from 'lightweight-charts';
import { getCoinHistory } from '../services/liveCoinWatch';
import { getCryptoAnalysis } from '../services/gemini';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

export const CoinDetail: React.FC = () => {
  const { coinId } = useParams<{ coinId: string }>();
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [isChartExpanded, setIsChartExpanded] = useState(true);
  const [isAnalysisExpanded, setIsAnalysisExpanded] = useState(true);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const history = await getCoinHistory(coinId || '');
        const analysisResult = await getCryptoAnalysis(coinId || '');
        setAnalysis(analysisResult);

        if (chartContainerRef.current && history) {
          const chart = createChart(chartContainerRef.current, {
            width: chartContainerRef.current.clientWidth,
            height: 400,
            layout: {
              background: { type: 'solid', color: 'transparent' },
              textColor: '#64748b',
            },
            grid: {
              vertLines: { color: '#e2e8f0' },
              horzLines: { color: '#e2e8f0' },
            },
            rightPriceScale: {
              borderColor: '#e2e8f0',
            },
            timeScale: {
              borderColor: '#e2e8f0',
            },
          });

          const lineSeries = chart.addLineSeries({
            color: '#22c55e',
            lineWidth: 2,
            crosshairMarkerVisible: true,
            crosshairMarkerRadius: 6,
          });

          const data = history.history.map((item: any) => ({
            time: new Date(item.date).getTime() / 1000,
            value: item.rate,
          }));

          lineSeries.setData(data);
          chartRef.current = chart;

          const handleResize = () => {
            if (chartContainerRef.current && chartRef.current) {
              chartRef.current.applyOptions({
                width: chartContainerRef.current.clientWidth,
              });
            }
          };

          window.addEventListener('resize', handleResize);
          return () => {
            window.removeEventListener('resize', handleResize);
            if (chartRef.current) {
              chartRef.current.remove();
            }
          };
        }
      } catch (error) {
        console.error('Error fetching coin data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [coinId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mr-4"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold">{coinId} Analysis</h1>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader className="cursor-pointer" onClick={() => setIsChartExpanded(!isChartExpanded)}>
              <div className="flex items-center justify-between">
                <CardTitle>Price Chart</CardTitle>
                {isChartExpanded ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </div>
            </CardHeader>
            <AnimatePresence>
              {isChartExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CardContent>
                    <div ref={chartContainerRef} className="w-full h-[400px]" />
                  </CardContent>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>

          <Card>
            <CardHeader className="cursor-pointer" onClick={() => setIsAnalysisExpanded(!isAnalysisExpanded)}>
              <div className="flex items-center justify-between">
                <CardTitle>AI Analysis</CardTitle>
                {isAnalysisExpanded ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </div>
            </CardHeader>
            <AnimatePresence>
              {isAnalysisExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CardContent>
                    <div className="prose dark:prose-invert max-w-none">
                      {analysis.split('\n').map((paragraph, index) => (
                        <p key={index} className="mb-4 text-neutral-700 dark:text-neutral-300">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </div>
      </div>
    </div>
  );
};