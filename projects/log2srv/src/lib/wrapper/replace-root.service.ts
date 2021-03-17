import { DOCUMENT } from '@angular/common';
import {
  ApplicationRef,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Inject,
  Injectable,
  Injector,
  Renderer2,
  RendererFactory2,
  Type,
} from '@angular/core';

import { EventWrapperComponent } from './event-wrapper.component';

/** @dynamic */
@Injectable()
export class ReplaceRootService {
  private readonly id: string = 'log2srv';

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly appRef: ApplicationRef,
    private readonly injector: Injector,
    private readonly componentFactoryResolver: ComponentFactoryResolver
  ) {}

  public replaceAppRoot(originalRef: ComponentRef<any>): void {
    const wrapperFactory = this.getFactory(EventWrapperComponent);
    const renderer: Renderer2 = this.getRenderer();

    this.setIdAttribute(renderer);

    const log2srv: EventWrapperComponent = this.attachRefView(
      wrapperFactory,
      this.id
    );

    this.removeIdAttribute(renderer);

    const host = log2srv.elementRef!.nativeElement;
    host.insertBefore(originalRef.location.nativeElement, host.firstChild);
  }

  private attachRefView<T>(
    componentFactory: ComponentFactory<T>,
    id: string
  ): T {
    const ref: ComponentRef<T> = componentFactory.create(
      this.injector,
      [],
      `#${id}`
    );
    this.appRef.attachView(ref.hostView);
    return ref.instance;
  }

  private setIdAttribute(renderer: Renderer2): void {
    renderer.setAttribute(this.document.body, 'id', this.id);
  }

  private removeIdAttribute(renderer: Renderer2): void {
    renderer.removeAttribute(this.document.body, 'id');
    renderer.removeAttribute(this.document.body, 'ng-version');
  }

  private getRenderer(): Renderer2 {
    return this.injector.get(RendererFactory2).createRenderer(null, null);
  }

  private getFactory<T>(component: Type<T>): ComponentFactory<T> {
    return this.componentFactoryResolver.resolveComponentFactory(component);
  }
}
