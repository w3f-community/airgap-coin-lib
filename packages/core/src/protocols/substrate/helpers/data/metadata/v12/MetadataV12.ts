import { SubstrateNetwork } from '../../../../SubstrateNetwork'
import { supportedCalls, supportedConstants, supportedStorageEntries } from '../../../node/supported'
import { SCALEDecoder } from '../../scale/SCALEDecoder'
import { SCALEArray } from '../../scale/type/SCALEArray'
import { SCALEInt } from '../../scale/type/SCALEInt'
import { SubstrateCall } from '../decorator/call/SubstrateCall'
import { SubstrateConstant } from '../decorator/constant/SubstrateConstant'
import { MetadataDecorator } from '../decorator/MetadataDecorator'
import { SubstrateStorageEntry } from '../decorator/storage/SubstrateStorageEntry'
import { MetadataVersioned } from '../MetadataVersioned'
import { MetadataV11Call } from '../v11/module/MetadataV11Call'
import { MetadataV11Constant } from '../v11/module/MetadataV11Constants'
import { MetadataV11Storage } from '../v11/module/storage/MetadataV11Storage'
import { MetadataV11StorageEntry } from '../v11/module/storage/MetadataV11StorageEntry'

import { MetadataV12Module } from './module/MetadataV12Module'

export class MetadataV12 extends MetadataVersioned {
  public static decode(network: SubstrateNetwork, runtimeVersion: number | undefined, raw: string): MetadataV12 {
    const decoder = new SCALEDecoder(network, runtimeVersion, raw)

    const magicNumber = decoder.decodeNextInt(32) // 32 bits
    const version = decoder.decodeNextInt(8) // 8 bits
    const modules = decoder.decodeNextArray(MetadataV12Module.decode)

    return new MetadataV12(magicNumber.decoded, version.decoded, modules.decoded) 
  }

  protected scaleFields = [this.magicNumber, this.version]

  protected constructor(
    readonly magicNumber: SCALEInt, 
    readonly version: SCALEInt, 
    readonly modules: SCALEArray<MetadataV12Module>
  ) {
    super()
  }

  public decorate(): MetadataDecorator {
    const storageEntries: SubstrateStorageEntry[][] = []
    const calls: SubstrateCall[][] = []
    const constants: SubstrateConstant[][] = []

    let callModuleIndex: number = 0
    for (const module of this.modules.elements) {
      const moduleName: string = module.name.value

      const storagePrefix: string | undefined = module.storage.value?.prefix?.value
      if (storagePrefix && Object.keys(supportedStorageEntries).includes(storagePrefix)) {
        const decoratedEntries: SubstrateStorageEntry[] | undefined = this.createDecoratedStorageEntries(module.storage.value)
        if (decoratedEntries) {
          storageEntries.push(decoratedEntries)
        }
      }

      if (Object.keys(supportedCalls).includes(moduleName)) {
        const decoratedCalls: SubstrateCall[] = this.createDecoratedCalls(moduleName, callModuleIndex, module.calls.value?.elements || [])
        calls.push(decoratedCalls)
      }

      if (Object.keys(supportedConstants).includes(moduleName)) {
        const decoratedConstants: SubstrateConstant[] = this.createDecoratedConstants(moduleName, module.constants.elements)
        constants.push(decoratedConstants)
      }

      if (module.calls.value !== undefined) {
        callModuleIndex += 1
      }
    }

    return new MetadataDecorator(
      storageEntries.reduce((flatten: SubstrateStorageEntry[], next: SubstrateStorageEntry[]) => flatten.concat(next), []),
      calls.reduce((flatten: SubstrateCall[], next: SubstrateCall[]) => flatten.concat(next), []),
      constants.reduce((flatten: SubstrateConstant[], next: SubstrateConstant[]) => flatten.concat(next), []),
    )
  }

  private createDecoratedStorageEntries(storage: MetadataV11Storage | undefined): SubstrateStorageEntry[] | undefined {
    if (storage) {
      return storage.storageEntries.elements
        .filter((entry: MetadataV11StorageEntry) => supportedStorageEntries[storage.prefix.value].includes(entry.name.value))
        .map((entry: MetadataV11StorageEntry) => entry.type.decorate(storage.prefix.value, entry.name.value))
    }

    return undefined
  }

  private createDecoratedCalls(moduleName: string, moduleIndex: number, calls: MetadataV11Call[]): SubstrateCall[] {
    return calls.map((call: MetadataV11Call, index: number) => {
      return {
        moduleName,
        name: call.name.value,
        moduleIndex,
        callIndex: index
      }
    })
  }

  private createDecoratedConstants(moduleName: string, constants: MetadataV11Constant[]): SubstrateConstant[] {
    return constants.map((constant: MetadataV11Constant) => {
      return {
        moduleName,
        name: constant.name.value,
        value: constant.value.bytes,
        type: constant.type.value
      }
    })
  }
}