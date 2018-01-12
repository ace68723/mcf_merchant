package com.mcf_merchant;
import com.facebook.react.ReactPackage;
import java.util.Arrays;
import java.util.List;

import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.reactnativenavigation.NavigationApplication;
import io.realm.react.RealmReactPackage;

public class MainApplication extends NavigationApplication {
  @Override
  public boolean isDebug() {
    // Make sure you are using BuildConfig from your own application
    return BuildConfig.DEBUG;
  }

  protected List<ReactPackage> getPackages() {
    // Add additional packages you require here
    // No need to add RnnPackage and MainReactPackage
    return Arrays.<ReactPackage>asList(
            new RCTCameraPackage(),
            new RNDeviceInfo(),
            new customPackage(),
            new RealmReactPackage()
    );
  }

  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
    return getPackages();
  }
  @Override
  public String getJSMainModuleName() {
    return "index";
  }
}
