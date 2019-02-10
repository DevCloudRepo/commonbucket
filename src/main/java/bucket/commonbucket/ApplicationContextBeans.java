package bucket.commonbucket;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

import com.storeservices.ecom.commons.BrowserDetailsBO;
import com.storeservices.ecom.commons.CallRemoteAPI;
import com.storeservices.ecom.commons.EcomUtility;
import com.storeservices.ecom.commons.GenericFileHandler;
import com.storeservices.ecom.entity.CreatePaymentRespBO;
import com.storeservices.ecom.entity.EcomAltPaymentBO;
import com.storeservices.ecom.entity.EcomSessionBO;
import com.storeservices.ecom.entity.EcomSessionResponseBO;
import com.storeservices.ecom.entity.EcomStatusBO;
import com.storeservices.ecom.entity.EcomStatusResponseBO;
import com.storeservices.ecom.entity.GetTokenRespBO;
import com.storeservices.ecom.entity.PreauthResponseBO;
import com.storeservices.ecom.entity.ProductInfoRequestBO;
import com.storeservices.ecom.entity.ProductInfoResponseBO;
import com.storeservices.ecom.entity.TemplateKeyBO;
import com.storeservices.util.EcomPropertFile;
import com.storeservices.util.JsonToMapObjectMapper;

@Configuration
public class ApplicationContextBeans  {
	@Bean
	@Scope("prototype")
	public EcomSessionResponseBO ecomSessionResponseBO(){
		return new EcomSessionResponseBO() ;
	}
	
	@Bean
	@Scope("prototype")
	public EcomSessionBO ecomSessionBO(){
		return new EcomSessionBO();
	}
	
	@Bean
	@Scope("prototype")
	public EcomStatusBO ecomStatusBO(){
		return new EcomStatusBO() ;
	}
	
	@Bean
	@Scope("prototype")
	public EcomStatusResponseBO ecomStatusResponseBO(){
		return new EcomStatusResponseBO() ;
	}
	
	@Bean
	@Scope("prototype")
	public EcomUtility ecomUtility(){
		return new EcomUtility();
	}
	
	@Bean
	@Scope("singleton")
	public EcomPropertFile ecomPropertFile(){
		return new EcomPropertFile();
	}
	
	@Bean("prototype")
	public JsonToMapObjectMapper jsonToMapObjectMapper(){
		return new JsonToMapObjectMapper();
	}
	
	@Bean
	@Scope("prototype")
	public TemplateKeyBO templateKeyBO(){
		return new TemplateKeyBO();
	}
	
	@Bean
	@Scope("prototype")
	public BrowserDetailsBO browserDetailsBO(){
		return new BrowserDetailsBO() ;
	}
	
	@Bean
	@Scope("prototype")
	public ProductInfoRequestBO productInfoRequestBO(){
		return new ProductInfoRequestBO() ;
	}
	
	@Bean
	@Scope("prototype")
	public ProductInfoResponseBO productInfoResponseBO(){
		return new ProductInfoResponseBO();
	}

	@Bean
	@Scope("prototype")
	public CallRemoteAPI callRemoteAPI(){
		return new CallRemoteAPI();
	}
	
	@Bean
	@Scope("prototype")
	public GenericFileHandler genericFileHandler(){
		return new GenericFileHandler();
	}		
	
	@Bean
	@Scope("prototype")
	public PreauthResponseBO preauthResponseBO(){
		return new PreauthResponseBO();
	}
	
	@Bean
	@Scope("prototype")
	public GetTokenRespBO getTokenRespBO(){
		return new GetTokenRespBO();
	}
	
	@Bean
	@Scope("prototype")
	public EcomAltPaymentBO ecomAltPaymentBO(){
		return new EcomAltPaymentBO();
	}
	
	@Bean
	@Scope("prototype")
	public CreatePaymentRespBO createPaymentRespBO(){
		return new CreatePaymentRespBO();
	}
}