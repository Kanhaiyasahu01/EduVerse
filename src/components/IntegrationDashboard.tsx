import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Database, 
  Wifi, 
  RefreshCw, 
  Plus, 
  Edit3, 
  ExternalLink, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Clock,
  Monitor
} from 'lucide-react';
import IntegrationService from '../services/IntegrationService';
import type { IntegrationConfig, SyncResult } from '../services/IntegrationService';

interface IntegrationDashboardProps {
  organizationName: string;
}

export const IntegrationDashboard: React.FC<IntegrationDashboardProps> = ({ organizationName }) => {
  const [integrations, setIntegrations] = useState<IntegrationConfig[]>([]);
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null);
  const [syncHistory, setSyncHistory] = useState<SyncResult[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'manage' | 'history'>('overview');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadIntegrations();
  }, []);

  useEffect(() => {
    if (selectedIntegration) {
      const history = IntegrationService.getSyncHistory(selectedIntegration);
      setSyncHistory(history);
    }
  }, [selectedIntegration]);

  const loadIntegrations = () => {
    const allIntegrations = IntegrationService.getAllIntegrations();
    setIntegrations(allIntegrations);
  };

  const handleTestConnection = async (integrationId: string) => {
    setIsLoading(true);
    try {
      await IntegrationService.testConnection(integrationId);
      loadIntegrations();
    } catch (error) {
      console.error('Connection test failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSync = async (integrationId: string) => {
    setIsLoading(true);
    try {
      await IntegrationService.syncData(integrationId);
      loadIntegrations();
      if (selectedIntegration === integrationId) {
        const history = IntegrationService.getSyncHistory(integrationId);
        setSyncHistory(history);
      }
    } catch (error) {
      console.error('Sync failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleAutoSync = (integrationId: string, enabled: boolean) => {
    IntegrationService.setAutoSync(integrationId, enabled);
    loadIntegrations();
  };

  const getStatusIcon = (status: IntegrationConfig['status']) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'disconnected':
        return <XCircle className="w-5 h-5 text-gray-400" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'syncing':
        return <RefreshCw className="w-5 h-5 text-blue-500 animate-spin" />;
      default:
        return <XCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getTypeIcon = (type: IntegrationConfig['type']) => {
    switch (type) {
      case 'LMS':
        return <Monitor className="w-5 h-5 text-blue-600" />;
      case 'ERP':
        return <Database className="w-5 h-5 text-purple-600" />;
      case 'University_Platform':
        return <ExternalLink className="w-5 h-5 text-green-600" />;
      default:
        return <Settings className="w-5 h-5 text-gray-600" />;
    }
  };

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* GEC Bilaspur Integration Status */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Database className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">GEC Bilaspur Integration Hub</h3>
            <p className="text-gray-600">Centralized integration management for {organizationName}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Connected Systems</span>
              <Wifi className="w-4 h-4 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-green-600">
              {integrations.filter(i => i.status === 'connected').length}
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Auto-Sync Enabled</span>
              <RefreshCw className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-blue-600">
              {integrations.filter(i => i.syncSettings.autoSync).length}
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Total Integrations</span>
              <Settings className="w-4 h-4 text-purple-500" />
            </div>
            <div className="text-2xl font-bold text-purple-600">
              {integrations.length}
            </div>
          </div>
        </div>
      </div>

      {/* Integration Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {integrations.map((integration) => (
          <div key={integration.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {getTypeIcon(integration.type)}
                <div>
                  <h3 className="font-semibold text-gray-900">{integration.name}</h3>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {integration.type}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {getStatusIcon(integration.status)}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Status:</span>
                <span className={`font-medium ${
                  integration.status === 'connected' ? 'text-green-600' :
                  integration.status === 'error' ? 'text-red-600' :
                  integration.status === 'syncing' ? 'text-blue-600' :
                  'text-gray-500'
                }`}>
                  {integration.status.charAt(0).toUpperCase() + integration.status.slice(1)}
                </span>
              </div>

              {integration.syncSettings.lastSync && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Last Sync:</span>
                  <span className="text-gray-700">
                    {integration.syncSettings.lastSync.toLocaleString()}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Auto Sync:</span>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={integration.syncSettings.autoSync}
                    onChange={(e) => handleToggleAutoSync(integration.id, e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-gray-700">
                    {integration.syncSettings.autoSync ? 'Enabled' : 'Disabled'}
                  </span>
                </label>
              </div>

              <div className="flex gap-2 mt-4">
                {integration.status === 'disconnected' ? (
                  <button
                    onClick={() => handleTestConnection(integration.id)}
                    disabled={isLoading}
                    className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 text-sm font-medium flex items-center justify-center gap-2"
                  >
                    <Wifi className="w-4 h-4" />
                    Connect
                  </button>
                ) : (
                  <button
                    onClick={() => handleSync(integration.id)}
                    disabled={isLoading || integration.status === 'syncing'}
                    className="flex-1 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 text-sm font-medium flex items-center justify-center gap-2"
                  >
                    <RefreshCw className={`w-4 h-4 ${integration.status === 'syncing' ? 'animate-spin' : ''}`} />
                    Sync Now
                  </button>
                )}
                
                <button
                  onClick={() => setSelectedIntegration(integration.id)}
                  className="px-3 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 text-sm font-medium"
                >
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Integration Card */}
      <div className="bg-gray-50 border-2 border-dashed border-gray-300 p-6 rounded-lg text-center hover:border-gray-400 transition-colors">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
            <Plus className="w-6 h-6 text-gray-500" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">Add New Integration</h3>
            <p className="text-gray-600 text-sm mb-4">
              Connect to LMS, ERP, or University platforms
            </p>
            <button
              onClick={() => alert('Add Integration feature will be implemented in the next phase')}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
            >
              Add Integration
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderManageTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Manage Integrations</h3>
        <button
          onClick={() => alert('Add Integration feature will be implemented in the next phase')}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Integration
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4 font-medium text-gray-900">Integration</th>
                <th className="text-left p-4 font-medium text-gray-900">Type</th>
                <th className="text-left p-4 font-medium text-gray-900">Status</th>
                <th className="text-left p-4 font-medium text-gray-900">Last Sync</th>
                <th className="text-left p-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {integrations.map((integration) => (
                <tr key={integration.id} className="hover:bg-gray-50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {getTypeIcon(integration.type)}
                      <div>
                        <div className="font-medium text-gray-900">{integration.name}</div>
                        <div className="text-sm text-gray-500">{integration.endpoint}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {integration.type}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(integration.status)}
                      <span className={`text-sm font-medium ${
                        integration.status === 'connected' ? 'text-green-600' :
                        integration.status === 'error' ? 'text-red-600' :
                        integration.status === 'syncing' ? 'text-blue-600' :
                        'text-gray-500'
                      }`}>
                        {integration.status.charAt(0).toUpperCase() + integration.status.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    {integration.syncSettings.lastSync 
                      ? integration.syncSettings.lastSync.toLocaleDateString()
                      : 'Never'
                    }
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleTestConnection(integration.id)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
                        title="Test Connection"
                      >
                        <Wifi className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleSync(integration.id)}
                        disabled={integration.status !== 'connected'}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-md disabled:text-gray-400"
                        title="Sync Now"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setSelectedIntegration(integration.id)}
                        className="p-2 text-gray-600 hover:bg-gray-50 rounded-md"
                        title="Edit"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderHistoryTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Sync History</h3>
        <select
          value={selectedIntegration || ''}
          onChange={(e) => setSelectedIntegration(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2"
        >
          <option value="">Select Integration</option>
          {integrations.map((integration) => (
            <option key={integration.id} value={integration.id}>
              {integration.name}
            </option>
          ))}
        </select>
      </div>

      {selectedIntegration && syncHistory.length > 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-900">Date</th>
                  <th className="text-left p-4 font-medium text-gray-900">Status</th>
                  <th className="text-left p-4 font-medium text-gray-900">Records</th>
                  <th className="text-left p-4 font-medium text-gray-900">Added</th>
                  <th className="text-left p-4 font-medium text-gray-900">Updated</th>
                  <th className="text-left p-4 font-medium text-gray-900">Errors</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {syncHistory.map((result, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="p-4 text-sm text-gray-600">
                      {result.timestamp.toLocaleString()}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {result.success ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-500" />
                        )}
                        <span className={`text-sm font-medium ${
                          result.success ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {result.success ? 'Success' : 'Failed'}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-gray-900">{result.recordsProcessed}</td>
                    <td className="p-4 text-sm text-green-600">{result.recordsAdded}</td>
                    <td className="p-4 text-sm text-blue-600">{result.recordsUpdated}</td>
                    <td className="p-4 text-sm text-red-600">{result.errors.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Sync History</h3>
          <p className="text-gray-600">
            {selectedIntegration 
              ? 'No synchronization has been performed for this integration yet.'
              : 'Please select an integration to view its sync history.'
            }
          </p>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">System Integrations</h2>
          <p className="text-gray-600">Manage connections to external systems and platforms</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'manage', label: 'Manage' },
            { id: 'history', label: 'Sync History' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && renderOverviewTab()}
      {activeTab === 'manage' && renderManageTab()}
      {activeTab === 'history' && renderHistoryTab()}
    </div>
  );
};