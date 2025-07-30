import React from 'react';
import { Filter, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Task {
  id: string;
  title: string;
  description: string;
  assignee: {
    name: string;
    role: string;
    avatar: string;
  };
  provider: {
    name: string;
    role: string;
    avatar: string;
  };
  dueDate: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'To Do' | 'In Progress' | 'Review' | 'Completed';
  tags: string[];
  createdAt: string;
}

interface Filters {
  status: string;
  priority: string;
  provider: string;
  assignee: string;
}

interface TaskFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  tasks: Task[];
}

const TaskFilters: React.FC<TaskFiltersProps> = ({
  filters,
  onFiltersChange,
  tasks
}) => {
  const uniqueProviders = Array.from(
    new Set(tasks.map((task) => task.provider.name))
  );
  const uniqueAssignees = Array.from(
    new Set(tasks.map((task) => task.assignee.name))
  );
  const statuses = ['To Do', 'In Progress', 'Review', 'Completed'];
  const priorities = ['Low', 'Medium', 'High', 'Critical'];

  const updateFilter = (key: keyof Filters, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      status: 'All',
      priority: 'All',
      provider: 'All',
      assignee: 'All'
    });
  };

  const activeFiltersCount = Object.values(filters).filter(
    (value) => value !== 'All'
  ).length;

  return (
    <Card className="bg-background/60 backdrop-blur-sm border border-accent/20">
      <CardContent className="p-6">
        {/* Top Row: Title + Active Count */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Filters</h3>
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                {activeFiltersCount} active
              </Badge>
            )}
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap gap-3 w-full lg:w-auto">
            {/* Status Filter */}
            <FilterGroup
              label="Status"
              value={filters.status}
              options={['All', ...statuses]}
              onChange={(value) => updateFilter('status', value)}
            />

            {/* Priority Filter */}
            <FilterGroup
              label="Priority"
              value={filters.priority}
              options={['All', ...priorities]}
              onChange={(value) => updateFilter('priority', value)}
            />

            {/* Provider Filter */}
            <FilterGroup
              label="Task Provider"
              value={filters.provider}
              options={['All', ...uniqueProviders]}
              onChange={(value) => updateFilter('provider', value)}
            />

            {/* Assignee Filter */}
            <FilterGroup
              label="Assignee"
              value={filters.assignee}
              options={['All', ...uniqueAssignees]}
              onChange={(value) => updateFilter('assignee', value)}
            />

            {/* Clear Button */}
            {activeFiltersCount > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearAllFilters}
                className="self-end"
              >
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
            )}
          </div>
        </div>

        {/* Active Filter Tags */}
        {activeFiltersCount > 0 && (
          <div className="mt-4 pt-4 border-t border-accent/20">
            <div className="flex flex-wrap gap-2">
              {Object.entries(filters).map(
                ([key, value]) =>
                  value !== 'All' && (
                    <Badge
                      key={key}
                      variant="secondary"
                      className="bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer"
                      onClick={() => updateFilter(key as keyof Filters, 'All')}
                    >
                      {key}: {value} <X className="ml-1 h-3 w-3" />
                    </Badge>
                  )
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// 🔹 Extracted reusable filter dropdown
const FilterGroup = ({
  label,
  value,
  options,
  onChange
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) => (
  <div className="flex flex-col space-y-1">
    <label className="text-xs font-medium text-muted-foreground">{label}</label>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[160px] bg-background/50 border border-accent/30">
        <SelectValue placeholder={`All ${label}`} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

export default TaskFilters;
