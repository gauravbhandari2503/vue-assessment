export default class FormErrors {
    private errors: Record<string, string[]> = {};
  
    get(field: string): string | undefined {
      if (this.errors[field]) {
        return this.errors[field][0];
      }
    }
  
    first(field: string): string | undefined {
      if (this.errors[field]) {
        return this.errors[field][0];
      }
    }
  
    set(field: string, value: string | string[]): void {
      this.errors[field] = Array.isArray(value) ? value : [value];
    }
  
    record(errors: Record<string, string[]>): void {
      this.errors = errors;
    }
  
    clear(field?: string): void {
      if (field) {
        delete this.errors[field];
      } else {
        this.errors = {};
      }
    }
  
    any(): boolean {
      return Object.keys(this.errors).length > 0;
    }
  
    has(field: string): boolean {
      // eslint-disable-next-line no-prototype-builtins
      return this.errors.hasOwnProperty(field);
    }
  
    clearAll(): void {
      this.errors = {};
    }
  }
  